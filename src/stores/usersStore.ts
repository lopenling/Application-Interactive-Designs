import { defineStore } from "pinia";

export type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | undefined;
};
export type TUserRoles = {
  administrator: TSingularUserRole;
  member: TSingularUserRole;
};
export type TSingularUserRole = {
  value: string;
  label: string;
};
export type TUserRoleKeys = keyof TUserRoles;

const users: TUser[] = [
  {
    id: 1,
    email: "barbara.smith@example.com",
    firstName: "Barbara",
    lastName: "Smith",
    avatarUrl: "/images/avatars/barbara_smith.jpg",
  },
  {
    id: 2,
    email: "david.jones@example.com",
    firstName: "David",
    lastName: "Jones",
    avatarUrl: "/images/avatars/david_jones.jpg",
  },
  {
    id: 3,
    email: "elizabeth.williams@example.com",
    firstName: "Elizabeth",
    lastName: "Williams",
    avatarUrl: "/images/avatars/elizabeth_williams.jpg",
  },
  {
    id: 4,
    email: "james.brown@example.com",
    firstName: "James",
    lastName: "Brown",
    avatarUrl: "/images/avatars/james_brown.jpg",
  },
  {
    id: 5,
    email: "jennifer.johnson@example.com",
    firstName: "Jennifer",
    lastName: "Johnson",
    avatarUrl: "/images/avatars/jennifer_johnson.jpg",
  },
  {
    id: 6,
    email: "jessica.taylor@example.com",
    firstName: "Jessica",
    lastName: "Taylor",
    avatarUrl: "/images/avatars/jessica_taylor.jpg",
  },
  {
    id: 7,
    email: "john.davis@example.com",
    firstName: "John",
    lastName: "Davis",
    avatarUrl: "/images/avatars/john_davis.jpg",
  },
  {
    id: 8,
    email: "joseph.miller@example.com",
    firstName: "Joseph",
    lastName: "Miller",
    avatarUrl: "/images/avatars/joseph_miller.jpg",
  },
  {
    id: 9,
    email: "linda.wilson@example.com",
    firstName: "Linda",
    lastName: "Wilson",
    avatarUrl: "/images/avatars/linda_wilson.jpg",
  },
  {
    id: 10,
    email: "mary.thompson@example.com",
    firstName: "Mary",
    lastName: "Thompson",
    avatarUrl: "/images/avatars/mary_thompson.jpg",
  },
  {
    id: 11,
    email: "michael.thomas@example.com",
    firstName: "Michael",
    lastName: "Thomas",
    avatarUrl: "/images/avatars/michael_thomas.jpg",
  },
  {
    id: 12,
    email: "patricia.anderson@example.com",
    firstName: "Patricia",
    lastName: "Anderson",
    avatarUrl: "/images/avatars/patricia_anderson.jpg",
  },
  {
    id: 13,
    email: "richard.white@example.com",
    firstName: "Richard",
    lastName: "White",
    avatarUrl: "/images/avatars/richard_white.jpg",
  },
  {
    id: 14,
    email: "robert.martin@example.com",
    firstName: "Robert",
    lastName: "Martin",
    avatarUrl: "/images/avatars/robert_martin.jpg",
  },
  {
    id: 15,
    email: "susan.moore@example.com",
    firstName: "Susan",
    lastName: "Moore",
    avatarUrl: "/images/avatars/susan_moore.jpg",
  },
  {
    id: 16,
    email: "william.jackson@example.com",
    firstName: "William",
    lastName: "Jackson",
    avatarUrl: "/images/avatars/william_jackson.jpg",
  },
];

export const userRoles: TUserRoles = {
  administrator: {
    value: "administrator",
    label: "Administrator",
  },
  member: {
    value: "member",
    label: "Member",
  },
};

export const useUsersStore = defineStore("usersStore", {
  state: () => ({
    users: users,
  }),
  getters: {
    getUserById: (state) => {
      return (userId: number) => state.users.find((user) => user.id === userId);
    },
    getUserFullNameById: (state) => {
      return (userId: number) => {
        const { firstName, lastName } = state.users.find((user) => user.id === userId) || {};
        return `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;
      };
    },
  },
});
