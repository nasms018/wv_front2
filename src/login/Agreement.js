import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "toolbox/Checkbox";
import CheckboxGroup from "toolbox/CheckboxGroup";
import { Button } from 'react-bootstrap';

export default function Agreement() {
  const [service, setService] = React.useState(false);

  return (
    <article>
      <fieldset>
        <legend>약관 동의</legend>
        <body>
          입하시려면 아래 사항들에 동의해주세요!<br />
          <Checkbox checked={service} onChange={setService}>
            (필수) 서비스 이용약관 동의
          </Checkbox>
        </body>
        <footer>
          <Link to={"/"}><Button variant="outline-secondary">이전으로</Button></Link>
          <Button disabled={!service} variant="outline-success"><Link to={"/register/"} style={{ textDecoration: "none" }}>회원 가입</Link></Button>
        </footer>
      </fieldset>
    </article>
  );
}

