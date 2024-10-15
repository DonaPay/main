module dona_pay::DonaPayCore {
   use std::signer;
   use std::string::{String};
   use aptos_framework:: table:: {Self, Table};
   use std::vector;

   struct User has store, copy, drop {
      addr: address,
      name: String,
      photoUrl: String,
      groups: vector<u64> 
   }

   struct Users has key {
      user: User
   }

   struct VoteLedger has store{
      votes : Table<address, u64>,
      totalVotes : u64
   }

   struct VoteLedgers has key {
      allVoteLedgers : Table<u64, VoteLedger>
   }

   // state 0 -> inactive
   // state 1 -> active
   struct Sabotage has store, copy, drop{
      id: u64,
      state : u64,
      selected : address,
   }

   struct Sabotages has key {
      allSabotages : Table<u64, Sabotage>,
      curr_id : u64
   }

   struct Group has store, copy, drop {
      id: u64,
      name: String,
      admins: vector<address>,
      members: vector<address>,
      joinRequests: vector<address>,
      imageUrl: String,
      pastSabotages : vector<u64>
   }

   struct Groups has key {
      allGroups: Table<u64, Group>,
      curr_id: u64,
   }

   const USER_DOES_NOT_EXISTS: u64 = 112;
   const USER_ALREADY_EXISTS : u64  = 1;
   const GROUP_NOT_FOUND: u64 = 4;
   const PERMISSION_DENIED: u64 = 105;
   const MEMBER_NOT_PRESENT : u64 = 110;
   const MEMBER_ALREADY_PRESENT: u64 = 111;
   const LEDGER_MUST_BALANCE: u64 = 150;
   const SABOTAGE_ID_MISMATCH: u64 = 160;
   const SABOTAGE_INACTIVE: u64 = 162;


   // This function is only called once when the module is published for the first time.
   fun init_module(account: &signer) {
      move_to(account, Groups {
         allGroups: table::new<u64, Group>(),
         curr_id: 0
      });
      move_to(account, VoteLedgers {
         allVoteLedgers: table::new<u64, VoteLedger>()
      });
      move_to(account, Sabotages {
         allSabotages: table::new<u64, Sabotage>(),
         curr_id : 0
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
   public fun getGroupCount():u64 acquires Groups{
      borrow_global<Groups>(@dona_pay).curr_id
   }


   #[view]
   public fun getUser(addr: address): User acquires Users {
      assert!(exists<Users>(addr), 112);
      borrow_global<Users>(addr).user
   }

   #[view]
   public fun get_user_groups(addr: address): vector<Group> acquires Users, Groups {
      assert!(exists<Users>(addr), 112);
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
         assert!(exists<Users>(*addr), 112);
         
         let user = borrow_global<Users>(*addr).user; 
         vector::push_back(&mut result, user);
         i = i + 1; 
      };

      result
   }

   #[view]
   public fun get_group(group_id: u64): Group acquires Groups {
      assert!(borrow_global<Groups>(@dona_pay).curr_id >= group_id, 4);
      *table::borrow<u64, Group>(&borrow_global<Groups>(@dona_pay).allGroups, group_id)
   }

   public entry fun group_join_request(account: &signer, group_id: u64) acquires Groups{
      let addr = signer::address_of(account);
      let groups = &mut borrow_global_mut<Groups>(@dona_pay).allGroups;
      let group = table::borrow_mut(groups,group_id);
      assert!(vector::contains<address>(&group.members, &addr) == false, MEMBER_ALREADY_PRESENT);
      vector::push_back(&mut group.joinRequests, addr);
   }

   public entry fun createGroup(account: &signer, group_name: String, imageUrl: String) acquires Groups, Users {
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
         joinRequests: join_requests,
         imageUrl:imageUrl,
         pastSabotages : vector::empty<u64>()
      };

      vector::push_back<u64>(&mut borrow_global_mut<Users>(creator).user.groups, group_id);

      table::add<u64, Group>(&mut group_mut.allGroups, group_id, new_group);
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

   public entry fun create_sabotage(account: &signer, group_id: u64) acquires Groups, Sabotages {
      let member_addr = signer::address_of(account);
      let group =  table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
      assert!(vector::contains<address>(&group.members, &member_addr),110);

      let global_sabotages = borrow_global_mut<Sabotages>(@dona_pay);
      global_sabotages.curr_id = global_sabotages.curr_id + 1;

      let curr_sabotage_id = global_sabotages.curr_id;

      let sabotage = Sabotage{
         id: curr_sabotage_id,
         state : 1,
         selected : @dona_pay
      };
      
      table::add<u64, Sabotage>(&mut global_sabotages.allSabotages, curr_sabotage_id, sabotage );

      vector::push_back<u64>(&mut group.pastSabotages, curr_sabotage_id);
   }

   #[view]
   public fun get_group_past_sabotages(group_id: u64): vector<Sabotage> acquires Sabotages, Groups {
      let group = table::borrow(&borrow_global<Groups>(@dona_pay).allGroups, group_id);
      let sabotages_count = vector::length(&group.pastSabotages);
      let sabotages = vector::empty<Sabotage>();
      let i = 0;
      while (i < sabotages_count) {
         let sabotage_id = *vector::borrow(&group.pastSabotages, i);
         let sabotage = *table::borrow(&borrow_global<Sabotages>(@dona_pay).allSabotages, sabotage_id);
         vector::push_back(&mut sabotages, sabotage);
         i = i + 1;
      };
      sabotages
   }

   public entry fun register_vote(account: &signer, group_id: u64, sabotage_id: u64, vote: address) acquires Groups, VoteLedgers {
    let member_addr = signer::address_of(account);
    let groups = borrow_global_mut<Groups>(@dona_pay);
    let group = table::borrow_mut(&mut groups.allGroups, group_id);
    assert!(vector::contains(&group.members, &member_addr), 110);
    assert!(vector::contains(&group.pastSabotages, &sabotage_id), 160);
    
    let vote_ledgers = borrow_global_mut<VoteLedgers>(@dona_pay);
    let vote_ledger = table::borrow_mut(&mut vote_ledgers.allVoteLedgers, sabotage_id);
    let total_votes = &mut vote_ledger.totalVotes;
    *total_votes = *total_votes + 1;
    let vote_count = table::borrow_mut(&mut vote_ledger.votes, vote);
    *vote_count = *vote_count + 1;
   }

   #[randomness]
   entry fun choose_payer(account: &signer, group_id: u64, sabotage_id: u64) acquires  Groups, Sabotages, VoteLedgers  {
      let member_addr = signer::address_of(account);
      let groups = borrow_global_mut<Groups>(@dona_pay);
      let group = table::borrow_mut(&mut groups.allGroups, group_id);
      assert!(vector::contains(&group.members, &member_addr), MEMBER_NOT_PRESENT);
      assert!(vector::contains(&group.pastSabotages, &sabotage_id), SABOTAGE_ID_MISMATCH);
      
      let sabotage = table::borrow_mut<u64, Sabotage>(&mut borrow_global_mut<Sabotages>(@dona_pay).allSabotages, sabotage_id);
      assert!(sabotage.state == 1, SABOTAGE_INACTIVE);

      let vote_ledger = table::borrow<u64, VoteLedger>(&borrow_global<VoteLedgers>(@dona_pay).allVoteLedgers, sabotage_id);

      let members = group.members;
      let members_count = vector::length(&members);

      let i = 0;
      let random_needed = true;

      while(i < members_count){
         let curr_vote_count = table::borrow_with_default<address,u64>(&vote_ledger.votes, *vector::borrow<address>(&members,i), &0);
         if(*curr_vote_count > vote_ledger.totalVotes){
            sabotage.selected = *vector::borrow<address>(&members,i);
            random_needed = false;
            break
         };
      };
      if(random_needed == true){
         select_someone(group_id, sabotage_id);
      };
      sabotage.state = 0;

   }
 
   #[randomness]
   entry fun select_someone(group_id: u64, sabotage_id: u64) acquires Groups, Sabotages{
      random_payer_setter(group_id, sabotage_id);
   }

   fun random_payer_setter(group_id: u64, sabotage_id: u64) acquires Groups, Sabotages {
      let groups = borrow_global_mut<Groups>(@dona_pay);
      let group = table::borrow_mut(&mut groups.allGroups, group_id);
      let memberCount = vector::length<address>(&group.members);
      let _rand_num = aptos_framework::randomness::u64_range(0, memberCount);
      let sabotage = table::borrow_mut<u64, Sabotage>(&mut borrow_global_mut<Sabotages>(@dona_pay).allSabotages, sabotage_id);
      assert!(sabotage.state == 1, SABOTAGE_INACTIVE);
      sabotage.selected = *vector::borrow<address>(&group.members, _rand_num)
   } 
}

// #[view]
   // public fun getRandomValue(): u64 acquires Random{
   //    borrow_global<Random>(@dona_pay).num
   // }
