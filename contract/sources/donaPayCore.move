module dona_pay::DonaPayCore {
   use std::signer;
   use std::string::{String};
   use aptos_framework:: table:: {Self, Table};
   use std::vector;
   use std::debug;

   struct User has store, copy, drop {
      addr: address,
      name: String,
      photoUrl: String,
      groups: vector<u64> 
   }

   struct Users has key {
      user: User
   }

//    struct PersonalLedger has store, copy, drop {
//     addr: address,                // Address of the person this ledger belongs to
//     balances: Table<address, u64>, // Tracks amounts owed to/from other group members
// }

//    struct Transaction has store, copy, drop {
//     id: u64,                   // Unique ID of the transaction
//     description: String,        // Description of the transaction (e.g., "Dinner bill")
//     payer: address,             // Address of the user who paid
//     amount: u64,                // Total amount of the transaction
//     split_amount: u64,          // Amount each member owes (after splitting)            
// }

//    struct GroupLedger has store, copy, drop {
//     personal_ledgers: vector<PersonalLedger>, // Maps each member's address to their personal ledger
//     transactions: vector<Transaction>,                // List of all transactions in the group
//     total_balance: u64,                               // Total outstanding balance for the group
// }


   struct Group has store, copy, drop {
      id: u64,
      name: String,
      admins: vector<address>,
      members: vector<address>,
      joinRequests: vector<address>,
      // ledger: GroupLedger // Each group has a ledger
   }

   struct Groups has key{
      allGroups: Table<u64, Group>,
      curr_id: u64,
   }

   struct Random has key{
      num: u64
   }

   const USER_ALREADY_EXISTS : u64  =  001;
   const GROUP_NOT_FOUND: u64 = 004;
   const PERMISSION_DENIED: u64 = 105;
   const MEMBER_NOT_PRESENT : u64 = 110;
   const MEMBER_ALREADY_PRESENT: u64 = 111;


   // This function is only called once when the module is published for the first time.
   fun init_module(account: &signer) {
      move_to(account, Groups {
         allGroups: table::new<u64, Group>(),
         curr_id: 0
      });
      move_to(account, Random {
         num: 0
      });

   }

   public entry fun createUser(account: &signer, name: String, photoUrl: String) {
      // assert!(exists<Users>(signer::address_of(account)),001);
      let addr = signer::address_of(account);
      let user = User {
         addr: addr,
         name: name,
         photoUrl: photoUrl,
         groups: vector::empty<u64>() 
      };
      move_to<Users>(account, Users { user });
   }
   #[view]
   public fun getUser(addr: address): User acquires Users {
      borrow_global<Users>(addr).user
   }

   #[view]
   public fun getGroupCount():u64 acquires Groups{
      borrow_global<Groups>(@dona_pay).curr_id
   }

   #[view]
   public fun get_user_groups(addr: address): vector<Group> acquires Users, Groups {
      let user_groups = borrow_global<Users>(addr).user.groups;
      let result: vector<Group> = vector::empty<Group>();

      let length = vector::length(&user_groups);
      let i = 0;
      while (i < length) {
         let group_id = *vector::borrow(&user_groups, i);
         let group = *table::borrow<u64, Group>(&borrow_global<Groups>(@dona_pay).allGroups, group_id);
         vector::push_back(&mut result, group);
         i = i + 1;
      };
      result 
   }

   #[view]
   public fun getUsersByArray(addrs: vector<address>): vector<User> acquires Users {
      let result: vector<User> = vector::empty<User>();

      // Iterate over each address
      let length = vector::length(&addrs);
      let i = 0;

      while (i < length) {
         let addr = vector::borrow(&addrs, i); 
         let user = borrow_global<Users>(*addr).user; 
         vector::push_back(&mut result, user);
         i = i + 1; 
      };

      result
   }


   public entry fun createGroup(account: &signer, group_name: String) acquires Groups, Users {
      // init_module(account);
      let creator = signer::address_of(account);

      let group_mut = borrow_global_mut<Groups>(@dona_pay);

      group_mut.curr_id = group_mut.curr_id + 1;

      let group_id = group_mut.curr_id;

      let admins = vector::empty<address>();
      vector::push_back(&mut admins, creator);

      let join_requests = vector::empty<address>();

      let members = vector::empty<address>();
      vector::push_back(&mut members, creator);

      let new_group = Group {
         id: group_id,
         name: group_name,
         admins: admins,
         members: members,
         joinRequests: join_requests
      };

      vector::push_back<u64>(&mut borrow_global_mut<Users>(creator).user.groups, group_id);

      table::add<u64, Group>(&mut group_mut.allGroups, group_id, new_group);
   }

   

   #[view]
   public fun get_group(group_id: u64): Group acquires Groups {
      *table::borrow<u64, Group>(&borrow_global<Groups>(@dona_pay).allGroups, group_id)
   }

   public entry fun group_join_request(account: &signer, group_id: u64) acquires Groups{
      let addr = signer::address_of(account);
      let groups = &mut borrow_global_mut<Groups>(@dona_pay).allGroups;
      let group = table::borrow_mut(groups,group_id);
      assert!(vector::contains<address>(&group.members, &addr) == false, 111);
      vector::push_back(&mut group.joinRequests, addr);
   }

   public entry fun approve_group_join(account: &signer, group_id: u64, member_addr: address) acquires Groups, Users {
      let admin_addr = signer::address_of(account);
      let group =  table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
      assert!(vector::contains<address>(&group.admins, &admin_addr),105);
      let (addr_present, index) = vector::index_of<address>(&group.joinRequests, &member_addr);
      assert!(addr_present, 110);
      vector::remove<address>(&mut group.joinRequests, index);
      vector::push_back<address>(&mut group.members, member_addr);
      vector::push_back<u64>(&mut borrow_global_mut<Users>(member_addr).user.groups, group_id);
   }

   public entry fun add_member_to_group(account: &signer, group_id: u64, member_addr : address) acquires Groups, Users {
      let admin_addr = signer::address_of(account);
      let group =  table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
      assert!(vector::contains<address>(&group.admins, &admin_addr),105);
      let (addr_present, index) = vector::index_of<address>(&group.joinRequests, &member_addr);
      if(addr_present) {
         vector::remove<address>(&mut group.joinRequests, index);
      };
      vector::push_back<address>(&mut group.members, member_addr);
      vector::push_back<u64>(&mut borrow_global_mut<Users>(member_addr).user.groups, group_id);
   }

   //    public entry fun split_expense(
   //    account: &signer, 
   //    group_id: u64, 
   //    total_amount: u64, 
   //    participants: vector<address>
   // ) acquires Groups {
         
   //    let addr = signer::address_of(account);
      
   //    // Borrow the group
   //    let group = &mut table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
      
   //    // Ensure the caller is a member of the group
   //    assert!(vector::contains<address>(&group.members, &addr), PERMISSION_DENIED);
      
   //    // Split the amount equally among the participants
   //    let num_participants = vector::length<address>(&participants);
   //    let split_amount = total_amount / num_participants;

   //    // Borrow the group ledger
   //    let ledger = &mut group.ledger.debts;
      
   //    // Add debt entries for each participant except the caller
   //    for participant in participants {
   //       if (participant != addr) { // Skip the caller
   //             // Borrow or create a nested table for each participant (debtor)
   //             let creditor_table = table::borrow_with_default_mut<address, Table<address, u64>>(
   //                ledger, 
   //                participant, 
   //                table::new<address, u64>()
   //             );

   //             // Update the debt amount for the caller (as the creditor)
   //             let current_debt = table::borrow_with_default_mut<address, u64>(creditor_table, addr, 0);
   //             *current_debt = *current_debt + split_amount;
   //       }
   //    }
   // }

   // public entry fun settle_debt(
   //    account: &signer, 
   //    group_id: u64, 
   //    creditor: address, 
   //    amount: u64
   // ) acquires Groups {
   //    let debtor = signer::address_of(account);

   //    // Borrow the group and the group ledger
   //    let group = &mut table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
   //    let ledger = &mut group.ledger.debts;

   //    // Ensure the debtor has a debt entry with the creditor
   //    let creditor_table = table::borrow_mut<address, Table<address, u64>>(ledger, debtor);
   //    let debt = table::borrow_mut<address, u64>(creditor_table, creditor);
   //    assert!(*debt >= amount, MEMBER_NOT_PRESENT);

   //    // Reduce the debt
   //    *debt = *debt - amount;

   //    // If the debt is fully settled, remove the entry
   //    if (*debt == 0) {
   //       table::remove<address, u64>(creditor_table, creditor);
   //    }

   //    // If the debtor has no more creditors, remove their entry from the ledger
   //    if (table::length(creditor_table) == 0) {
   //       table::remove<address, Table<address, u64>>(ledger, debtor);
   //    }
   // }



   #[view]
   public fun getRandomValue(): u64 acquires Random{
      borrow_global<Random>(@dona_pay).num
   }
 
   #[randomness]
   entry fun test_rand() acquires Random{
      test_randomness();
   }

   fun test_randomness() acquires Random {
      let num = aptos_framework::randomness::u64_range(0, 10);
       let num_mut = &mut borrow_global_mut<Random>(@dona_pay).num;
       *num_mut = num;
   } 

   // #[test]
   // fun test_get_user_groups() acquires Users, Groups {
   //  let user_addr: address = @0x0fa795f2566b0eeebbe1a2dcbe127161b02eda171d8a5053a979c623eac23af3; 
   //  let user_groups = get_user_groups(user_addr);

   //  // Print the names of the groups the user belongs to
   //  let length = vector::length(&user_groups);
   //  let i = 0;

   //  while (i < length) {
   //      let group = *vector::borrow(&user_groups, i); // Borrow the group at index i
   //      debug::print(&group.name); // Print the group name
   //      i = i + 1; // Increment the index
   //  }
}

