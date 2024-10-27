import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

import { config } from "@/constants";

//Init your react native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const databases = new Databases(client);

export const account = new Account(client);

export const AppWriteCreateUser = async (
  email: string,
  password: string,
  username: string,
) => {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username,
  );
  if (!newAccount) throw Error;
  await AppWriteSignIn(email, password);
  const newUser = await databases.createDocument(
    config.databaseId!,
    config.userscollectionId!,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      username,
    },
  );
  await databases.createDocument(
    config.databaseId!,
    config.kanban_columncollectionId!,
    ID.unique(),
    {
      name: "Wishlist",
      index: 1,
      user: newUser.$id,
    },
  );
  return newUser;
};

export const AppWriteSignIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AppWriteLogOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const AppWriteCurrentSession = async () => {
  const currentAccount = await account.getSession("current");
  return currentAccount;
};

export const AppWriteCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await databases.listDocuments(
      config.databaseId!,
      config.userscollectionId!,
      [Query.equal("accountId", currentAccount.$id)],
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
