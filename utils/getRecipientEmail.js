const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email 
  // || userLoggedIn?.phoneNumber
  )[0];
export default getRecipientEmail;
