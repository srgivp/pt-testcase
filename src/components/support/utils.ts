export const usersOnPage = 40;
export const fetchingStep = 5;
const leadUserCardsDefiner = () => {
    let leadUserCards = [];
    for (let i=0; i < usersOnPage; i+=fetchingStep){
        leadUserCards.push(i);
    }
    console.log(leadUserCards);
    return leadUserCards;
}

export const leadUserCards = leadUserCardsDefiner();

export const initialStateUsersInfoGenerator = (pageNumber: number, quantity: number) => {
    let usersToMock;
    const usersRest = quantity - usersOnPage*(pageNumber-1);
    usersToMock = usersRest > usersOnPage ? usersOnPage : usersRest;
    let usersInfo = [];
    for (let i=0; i<usersToMock; i++) {
        usersInfo.push({id: i as number | string, firstName: 'Firstname', lastName: 'Lastname', picture: 'none'});
    }
return usersInfo;
}

export const pageToFetchDefiner = (appPage: number, orderNumber: number) => {
    const currentUsersPageStartsAt = usersOnPage/fetchingStep*(appPage-1);
    return currentUsersPageStartsAt+leadUserCards.indexOf(orderNumber);
}
