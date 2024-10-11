module dona_pay::DonaPayCore {
   use std::signer;
   use std::string::{String, utf8};
   use std::debug::print;
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

   struct Groups has key {
      allGroups: Table<u64, Group>,
      curr_id: u64,
   }

   struct Users has key {
      user: User
   }

   fun init_module(account: &signer) {
      move_to(account, Groups {
         allGroups: table::new<u64, Group>(),
         curr_id: 0
      });
   }

   fun createUser(account: &signer, name: String, photoUrl: String) {
      let addr = signer::address_of(account);
      let user = User {
         addr: addr,
         name: name,
         photoUrl: photoUrl,
         groups: vector::empty<u64>() 
      };
      move_to<Users>(account, Users { user });
   }

   fun getUser(account: &signer): User acquires Users {
      let addr = signer::address_of(account);
      borrow_global<Users>(addr).user
   }

   fun createGroup(account: &signer, group_name: String) acquires Groups, Users {
      init_module(account);
      let addr = signer::address_of(account);

      // let group_mut = borrow_global_mut<Groups>(@0x38a5cb2773e0c23e4f2da107e0c69848704b325d0e8fc2c1cf0924dbede4bd67);
      let group_mut = borrow_global_mut<Groups>(signer::address_of(account));
      print("")
      group_mut.curr_id = group_mut.curr_id + 1;

      let group_id = group_mut.curr_id;

      let admins = vector::empty<address>();
      vector::push_back(&mut admins, addr);

      let members = vector::empty<User>();
      let creator = getUser(account);
      vector::push_back(&mut members, creator);

      let new_group = Group {
         id: group_id,
         name: group_name,
         admins: admins,
         members: members
      };

      table::add<u64, Group>(&mut group_mut.allGroups, group_id, new_group);
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
