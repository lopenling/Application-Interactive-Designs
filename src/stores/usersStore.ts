import { defineStore } from "pinia";

export type TUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | undefined;
};
export type TUserRoles = {
  administrator: TSingularUserRole;
  member: TSingularUserRole;
};
export type TSingularUserRole = {
  value: string;
  label: string;
};

type TAddUser = { userEmail: string; userId?: number };

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
    // avatarUrl: "/images/avatars/jessica_taylor.jpg",
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
    getUsersByIds: (state) => {
      return (userIds: number[]) => state.users.filter((user) => userIds.includes(user.id));
    },
    getNewUserId: (state) => {
      return () => {
        const highestId = Math.max(...state.users.map((user) => user.id));
        return highestId + 1;
      };
    },
    getUserFullNameById: (state) => {
      return (userId: number) => {
        const { firstName, lastName } = state.users.find((user) => user.id === userId) || {};

        if (!firstName && !lastName) return null;
        return `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;
      };
    },
    getUserInitialsById: (state) => {
      return (userId: number) => {
        const { firstName, lastName, email } = state.users.find((user) => user.id === userId) || {};

        if (!firstName && !lastName) return email![0].toUpperCase();
        return `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`;
      };
    },
    getUserEmailFirstLetterById: (state) => {
      return (userId: number) => {
        const { email } = state.users.find((user) => user.id === userId) || {};
        return email![0].toUpperCase();
      };
    },
    getPossessiveFirstNameById: (state) => {
      return (userId: number) => {
        const { firstName } = state.users.find((user) => user.id === userId) || {};
        if (!firstName) return null;

        if (firstName.endsWith("s") || firstName.endsWith("S")) {
          return `${firstName}'`;
        } else {
          return `${firstName}'s`;
        }
      };
    },
  },
  actions: {
    addUser({ userEmail, userId }: TAddUser) {
      const newUserId = this.getNewUserId();
      this.$patch((state) => {
        state.users.push({ id: userId || newUserId, email: userEmail });
      });
    },
  },
  persist: true,
});
