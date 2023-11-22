import LoginButton from "login/LoginButton";
import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AxiosPost, Fetch } from "toolbox/Fetch";
import AppContext from "context/AppContextProvider";


export default function TestNav() {
  const boardListUri = `/bb/anonymous/listAll`;

  const { auth } = useContext(AppContext);
  console.log(auth);
  const navMenu = {
    color: "grey",
    textDecoration: "none",

  }

  return <>
    <Navbar expand="lg" className="bg-body-tertiary"  style={{position: "sticky", top: 0, zIndex: "2"}}>
      <Container>
        <Navbar.Brand href="/"><Link style={navMenu} to='/' class="jb-nav">WonderVatory</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto  my-2 my-lg-0">
            <LoginButton className="me-auto  my-2 my-lg-0" />
            <Fetch uri={boardListUri} renderSuccess={renderSuccess} />
            <Nav.Link><Link style={navMenu} class="jb-nav" to="/Books" >북</Link></Nav.Link>
            {(auth && auth.roles && auth.roles.includes('manager') || auth.roles.includes('admin'))
              ? <>
                <Nav.Link><Link style={navMenu} class="jb-nav" to="/MemberPrev">회원정보</Link></Nav.Link>
                <Nav.Link><Link style={navMenu} class="jb-nav" to="/ReportPrev">신고사항</Link></Nav.Link>
              </>
              : ""
            }
            {/*
            <Nav.Link><Link style={navMenu} class="jb-nav" to="/Test5">테스트용5</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} class="jb-nav" to="/test2">테스트용2</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} class="jb-nav" to="/Test4" >테스트용4</Link></Nav.Link>
          */}
          <Nav.Link><Link style={navMenu} class="jb-nav" to="/test1">테스트용</Link></Nav.Link>
          <Nav.Link><Link style={navMenu} class="jb-nav" to="/Test3" >테스트용3</Link></Nav.Link>
          <Nav.Link><Link style={navMenu} class="jb-nav" to="/Test5">테스트용5</Link></Nav.Link>
            <Nav.Link><Link style={navMenu} class="jb-nav" to="/Test6">테스트용6</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
  function renderSuccess(boardList) {

    return <>
      {boardList.map(board => (
        <Nav.Link>
          <Link style={navMenu} class="jb-nav" key={board.id}  to={`/board/${board.id}`}
          state={{boardId:board.id, page:1}}>{board.name}</Link>
          </Nav.Link>
      ))}
    </>
  }
 
}


