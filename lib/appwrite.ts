import { Client, Databases } from "react-native-appwrite";

import { config } from "@/constants";

//Init your react native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const databases = new Databases(client);

// const account = new Account(client);
// const avatars = new Avatars(client);

// export const createUser = async (
//   email: string,
//   password: string,
//   username: string
// ) => {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );
//     if (!newAccount) throw Error;
//     const avatarUrl = avatars.getInitials(username);
//     await signIn(email, password);
//     const newUser = await databases.createDocument(
//       config.databaseId,
//       config.userscollectionId,
//       ID.unique(),
//       {
//         accountId: newAccount.$id,
//         email,
//         username,
//         avatar: avatarUrl,
//       }
//     );
//     return newUser;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signIn = async (email: string, password: string) => {
//   try {
//     const session = await account.createEmailPasswordSession(email, password);
//     return session;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     const currentAccount = await account.get();
//     if (!currentAccount) {
//       throw Error;
//     }
//     const currentUser = await databases.listDocuments(
//       config.databaseId,
//       config.userscollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );
//     if (!currentUser) throw Error;
//     return currentUser.documents[0];
//   } catch (error) {
//     console.log(error);
//   }
// };
