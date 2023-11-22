import React from 'react'
import SocialKakao from 'kakao-login/SocialKakao';
import styled from "@emotion/styled";
import useHover from 'hooks/useHover';
import Gra1 from './Gra1';
import { Fetch } from 'toolbox/Fetch';
import ToolManager from 'component-tool/ToolManager';
import axios from 'api/axios';

// 시각적인 효과를 위해 BOX컴포넌트 사용
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  
`;
 const Test5 = () => {
  const data =
  [
    {
      "country": "AD",
      "hot dog": 167,
      "hot dogColor": "hsl(15, 70%, 50%)",
      "burger": 59,
      "burgerColor": "hsl(113, 70%, 50%)",
      "sandwich": 74,
      "sandwichColor": "hsl(208, 70%, 50%)",
      "kebab": 112,
      "kebabColor": "hsl(196, 70%, 50%)",
      "fries": 193,
      "friesColor": "hsl(149, 70%, 50%)",
      "donut": 89,
      "donutColor": "hsl(168, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 131,
      "hot dogColor": "hsl(189, 70%, 50%)",
      "burger": 113,
      "burgerColor": "hsl(43, 70%, 50%)",
      "sandwich": 83,
      "sandwichColor": "hsl(178, 70%, 50%)",
      "kebab": 123,
      "kebabColor": "hsl(317, 70%, 50%)",
      "fries": 169,
      "friesColor": "hsl(3, 70%, 50%)",
      "donut": 184,
      "donutColor": "hsl(1, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 35,
      "hot dogColor": "hsl(126, 70%, 50%)",
      "burger": 80,
      "burgerColor": "hsl(79, 70%, 50%)",
      "sandwich": 105,
      "sandwichColor": "hsl(222, 70%, 50%)",
      "kebab": 57,
      "kebabColor": "hsl(295, 70%, 50%)",
      "fries": 176,
      "friesColor": "hsl(122, 70%, 50%)",
      "donut": 65,
      "donutColor": "hsl(30, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 102,
      "hot dogColor": "hsl(30, 70%, 50%)",
      "burger": 107,
      "burgerColor": "hsl(150, 70%, 50%)",
      "sandwich": 183,
      "sandwichColor": "hsl(291, 70%, 50%)",
      "kebab": 167,
      "kebabColor": "hsl(145, 70%, 50%)",
      "fries": 182,
      "friesColor": "hsl(284, 70%, 50%)",
      "donut": 186,
      "donutColor": "hsl(342, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 143,
      "hot dogColor": "hsl(264, 70%, 50%)",
      "burger": 129,
      "burgerColor": "hsl(150, 70%, 50%)",
      "sandwich": 50,
      "sandwichColor": "hsl(249, 70%, 50%)",
      "kebab": 143,
      "kebabColor": "hsl(319, 70%, 50%)",
      "fries": 56,
      "friesColor": "hsl(296, 70%, 50%)",
      "donut": 89,
      "donutColor": "hsl(120, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 13,
      "hot dogColor": "hsl(291, 70%, 50%)",
      "burger": 26,
      "burgerColor": "hsl(41, 70%, 50%)",
      "sandwich": 95,
      "sandwichColor": "hsl(202, 70%, 50%)",
      "kebab": 67,
      "kebabColor": "hsl(47, 70%, 50%)",
      "fries": 160,
      "friesColor": "hsl(97, 70%, 50%)",
      "donut": 169,
      "donutColor": "hsl(213, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 46,
      "hot dogColor": "hsl(99, 70%, 50%)",
      "burger": 165,
      "burgerColor": "hsl(183, 70%, 50%)",
      "sandwich": 160,
      "sandwichColor": "hsl(211, 70%, 50%)",
      "kebab": 128,
      "kebabColor": "hsl(195, 70%, 50%)",
      "fries": 96,
      "friesColor": "hsl(31, 70%, 50%)",
      "donut": 168,
      "donutColor": "hsl(335, 70%, 50%)"
    }
  ]

  const read = async () =>{
    try{
      const {data} = await axios.get(
        `/work/anonymous/listRead`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(res=>console.log(res))
      console.log(data)
    }catch{

    }
    
  }

  function renderSuccess(data) {

<<<<<<< HEAD
    console.log("이거 통계 그래프로 보여주는 거지?", data)

    const listRead = data
    console.log(listRead)
    return(<>
    <div style={{width:700, height:500}}>
      <Gra1 data={listRead}/>
    </div>
=======
    return(<>
    <div style={{width:700, height:500}}>
    {console.log(data)}
        <Gra1 data={data}/>

        </div>
>>>>>>> 0ccbf71e49d1f5e3697755d5721032f6a4721e4d
    </>
    )
 }

  return (<>
    <Fetch uri={`/work/anonymous/listRead`} renderSuccess={renderSuccess} />
    <div style={{width:700, height:500}}> {/*  style={{width:700, height:500}} 가로 세로 꼭줘야함 */}
      <Gra1 data={data}/>
      <br/>
      <p><button onClick={()=>read()}>11</button>{ToolManager.X_MIN_SIZE + "에요"}</p>
    </div></>
  );
};
export default Test5
