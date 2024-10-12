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

   struct Group has store, copy, drop {
      id: u64,
      name: String,
      admins: vector<address>,
      members: vector<User>,
      joinRequests: vector<User>
   }

   struct Groups has key{
      allGroups: Table<u64, Group>,
      curr_id: u64,
   }

   struct Users has key {
      user: User
   }

   const USER_ALREADY_EXISTS : u64  =  001;
   const GROUP_NOT_FOUND: u64 = 004;
   const PERMISSION_DENIED: u64 = 105;
   const MEMBER_NOT_PRESENT : u64 = 110;
   const MEMBER_ALREADY_PRESENT: u64 = 111;

   fun init_module(account: &signer) {
      move_to(account, Groups {
         allGroups: table::new<u64, Group>(),
         curr_id: 0
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

   public entry fun createGroup(account: &signer, group_name: String) acquires Groups, Users {
      // init_module(account);
      let addr = signer::address_of(account);

      let group_mut = borrow_global_mut<Groups>(@dona_pay);

      group_mut.curr_id = group_mut.curr_id + 1;

      let group_id = group_mut.curr_id;

      let admins = vector::empty<address>();
      vector::push_back(&mut admins, addr);

      let join_requests = vector::empty<User>();

      let members = vector::empty<User>();
      let creator = getUser(signer::address_of(account));
      vector::push_back(&mut members, creator);

      let new_group = Group {
         id: group_id,
         name: group_name,
         admins: admins,
         members: members,
         joinRequests: join_requests
      };

      vector::push_back<u64>(&mut borrow_global_mut<Users>(addr).user.groups, group_id);

      table::add<u64, Group>(&mut group_mut.allGroups, group_id, new_group);
   }

   #[view]
   public fun get_group(group_id: u64): Group acquires Groups {
      *table::borrow<u64, Group>(&borrow_global<Groups>(@dona_pay).allGroups, group_id)
   }

   public entry fun group_join_request(account: &signer, group_id: u64) acquires Users, Groups{
      let addr = signer::address_of(account);
      let user = getUser(addr);
      let groups = &mut borrow_global_mut<Groups>(@dona_pay).allGroups;
      let group = table::borrow_mut(groups,group_id);
      assert!(vector::contains<User>(&group.members, &user), 111);
      vector::push_back(&mut group.joinRequests, user);
   }

   public entry fun approve_group_join(account: &signer, group_id: u64, member_addr: address) acquires Groups, Users {
      let admin_addr = signer::address_of(account);
      let group =  table::borrow_mut<u64, Group>(&mut borrow_global_mut<Groups>(@dona_pay).allGroups, group_id);
      assert!(vector::contains<address>(&group.admins, &admin_addr),105);
      let user = getUser(member_addr);
      let (addr_present, index) = vector::index_of<User>(&group.joinRequests, &user);
      assert!(addr_present, 110);
      vector::remove<User>(&mut group.joinRequests, index);
      vector::push_back<User>(&mut group.members, user);
      vector::push_back<u64>(&mut borrow_global_mut<Users>(member_addr).user.groups, group_id);
   }

   
}
