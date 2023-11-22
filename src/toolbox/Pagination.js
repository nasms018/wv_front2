import { Pagination } from "react-bootstrap";

function goTo(chosenPage, state, setUri = f => f, buildUrl = f => f) {
    state.postListWithPaging = null;
    state.page = chosenPage;

    setUri(buildUrl());
}

export const displayPagination = (paging, state, setUri = f => f, buildUrl = f => f) => {
    const pagingBar = [];
    if (paging.prev)
        pagingBar.push(<Pagination.Item key={paging.startPage - 1}
            onClick={(e) => goTo(paging.startPage - 1, state, setUri, buildUrl)}
        >&lt;</Pagination.Item>);
    for (let i = paging.startPage; i <= paging.lastPage; i++) {
        pagingBar.push(<Pagination.Item key={i}
            onClick={(e) => goTo(i, state, setUri, buildUrl)}
        >{i}</Pagination.Item>);
    }
    if (paging.next)
        pagingBar.push(<Pagination.Item key={paging.lastPage + 1}
            onClick={(e) => goTo(paging.lastPage + 1, state, setUri, buildUrl)}
        >&gt;</Pagination.Item>);
    return pagingBar;
}