import {Link} from "react-router-dom";
import ROUTES from "../../routes/routes-constants";
import {usersOnPage} from "./utils";

const linksGenerator = (n: number): JSX.Element[] => {
    let linksArr: Array<JSX.Element> | [] = [];
    let pagesQuantity = Math.floor(n/usersOnPage);
    if (n > pagesQuantity*usersOnPage) {
        pagesQuantity++;
    }
    for (let j = 1; j < pagesQuantity + 1; j++) {
        let link: JSX.Element = <Link key={`link-to-${j + 1}`} to={ROUTES.dynamic.usersPage(j)}>
        <div className='page-number'>{j}</div>
            </Link>
        // @ts-ignore
        linksArr.push(link);
    }
    return linksArr;
}

export default linksGenerator;