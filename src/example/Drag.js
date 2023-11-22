import React, { useRef, useState, useContext } from 'react';
import PropTest from './PropTest';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";

export default function Drag({name = "야호", initPropList = []}) {
  const { auth } = useContext(AppContext);

  const dragItem = useRef();
  const dragOverItem = useRef();
  const lookUpId = useRef();

  const PROPERTIES_LIST_URL = "/tool/anonymous/listPropertiesOf/"
  const PROPERTIES_SYNC_URL = "/tool/syncPropertiesOf/"

  /*{propType : 'type 1', propVal : 'val 1', isSafe : true, isEdited : false},
  {propType : 'type 2', propVal : 'val 2', isSafe : true, isEdited : false},
  {propType : 'type 3', propVal : 'val 3', isSafe : true, isEdited : false},
  {propType : 'type 4', propVal : 'val 4', isSafe : true, isEdited : false}*/

  const [propList, setPropList] = useState(initPropList);
  const [originalList, setOriginalList] = useState(initPropList); // 나중에 추가할 기능

  // 어떤 때는 인덱스로 해야 하고 어떤 때는 레벨로 해야 하다보니까 난리다 아주
  // 인덱스가 필요한 시점 : create 판단, 정렬시 짝 맞추기
  // 레벨이 필요한 시점 : post시 삭제된 녀석의 정보

  // -> 그냥 싹 다 화면 순서에 맞출 것

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    const copyListItems = [...propList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPropList(copyListItems);
  };

  function lookUp(id) {
    let uri = PROPERTIES_LIST_URL + id
    fetch(uri).then(response => response.json())
      .then((resData) => {
        let wrappedData = resData.map(prop => {return {...prop, isSafe : true, isEdited : false}});
        setPropList(wrappedData);
        setOriginalList(wrappedData);
      })
      .catch(() => {
        setPropList([])
        setOriginalList([])
      });
  }

  function commit(id) {
    console.log("이 유저가 보냅니다: ", auth)
    let uri = PROPERTIES_SYNC_URL + id
    console.log("다음 주소로 보냅니다: ", PROPERTIES_SYNC_URL + id)
    let request = propList.map( prop => {
      return {"propType" : prop.propType, "propVal" : prop.propVal, "isEdited" : prop.isEdited}
    })
    console.log("이것을 보냅니다: ", request)
    // 다 때려치고 JSON.stringify가 채고인 거시다!!!
    axios.post(uri, JSON.stringify(request), {
      headers: {
        'Content-Type': 'application/json',
        "x-auth-token": `Bearer ${auth?.accessToken}`
      }
    })
    .then(() => {
      setOriginalList([...propList])
    })
    .catch((error) => {console.log(error)})
  }

  const newProp = () => {
    setPropList([...propList, {propType : "", propVal : "", isSafe : false, isEdited : false}])
  };

  const setType = (index, value) => {
    let newList = editRes(index, "propType", value);
    let propTypeList = newList.map(prop => prop.propType)
    newList = newList.map((prop, idx) => {return {...prop, isSafe : checkQuality(idx, prop.propType, propTypeList)}})
    newList[index].isSafe = checkQuality(index, value, propTypeList)
    setPropList(newList)
  }

  const setVal = (index, value) => {
    setPropList(editRes(index, "propVal", value))
  }

  const editRes = (index, prop, value) => {
    let newList = [...propList]
    newList[index][prop] = value
    return newList
  }

  function checkQuality(index, value, propTypeList) {
    // 비어있지 않으면 일단 합격
    return value !== "" && ! propTypeList.filter((_, idx) => idx !== index).includes(value)
  }

  const onRemove = (index) => {
    setPropList([...propList].filter((_, idx) => {return idx !== index}))
  }

  console.log("지금 반영 안 돼?", propList && ! propList.length > 0 &&
  ! propList.reduce((accumulator, currentValue) => accumulator && currentValue.isSafe, true))

  return (
    <>
      <h2>{name}</h2>
      <input ref={lookUpId} type="text" placeholder='커스텀 오브젝트 ID'/>
      <button onClick={e => lookUp(lookUpId.current.value)}>조회하기</button>
      <br/>
      <button disabled={
        propList && propList.length > 0 &&
        propList.reduce((accumulator, currentValue) => accumulator || ! currentValue.isSafe, false)
      } onClick={e => commit(lookUpId.current.value)}>저장하기</button>
      {propList && propList.length > 0 ?
        propList.map((item, index) => {
          let bgColor = item.isSafe ? 'lightblue' : 'pink'
          return <div
          style={{
            backgroundColor: bgColor,
            margin: '20px 30%',
            textAlign: 'center',
          }}
          onDragStart={() => dragStart(index)}
          onDragEnter={() => dragEnter(index)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={drop}
          key={index}
          draggable>
          {/* 임시 위치 표시*/}
          <p>{index}</p>
          <PropTest key={index} level={index}
            propType={item.propType}
            propVal={item.propVal}
            setType={setType}
            setVal={setVal}
          />
          <br/>
          <button onClick={() => onRemove(index)}>제거하기</button>
          <p style={{color : "#ff0000"}}>
            {item.isSafe
            ? ""
            : item.propType
            ? "속성 이름이 중복되었습니다" 
            : "속성 이름이 비어있습니다"}
          </p>
        </div>
        })
      : <p>{"(속성이 없습니다)"}</p>
      }
      <button onClick={() => newProp()}>+ 추가하기</button>
    </>
  );
}