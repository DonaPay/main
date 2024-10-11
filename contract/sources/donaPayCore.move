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

   public entry fun createGroup(account: &signer, group_name: String) acquires Groups, Users {
      // init_module(account);
      let addr = signer::address_of(account);

      let group_mut = borrow_global_mut<Groups>(@dona_pay);
      // print(&group_mut.curr_id);
      group_mut.curr_id = group_mut.curr_id + 1;
      // print(&group_mut.curr_id);

      let group_id = group_mut.curr_id;

      let admins = vector::empty<address>();
      vector::push_back(&mut admins, addr);

      let members = vector::empty<User>();
      let creator = getUser(signer::address_of(account));
      vector::push_back(&mut members, creator);

      let new_group = Group {
         id: group_id,
         name: group_name,
         admins: admins,
         members: members
      };

      table::add<u64, Group>(&mut group_mut.allGroups, group_id, new_group);
   }

   #[view]
   public fun get_group(group_id: u64): Group acquires Groups {
      *table::borrow<u64, Group>(&borrow_global<Groups>(@dona_pay).allGroups, group_id)
   }

   #[test(account = @0x12345)]
   fun test_create(account: &signer) acquires Users, Groups {
      let name = utf8(b"Aditya");
      let photoUrl = utf8(b"google.com");
      createUser(account, name, photoUrl);
      let user = getUser(account);
      print(&user);

      // Test group creation
      let group_name = utf8(b"MyGroup");
      createGroup(account, group_name);

      print(&utf8(b"Group created successfully!"));
   }
}
