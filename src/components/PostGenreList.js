import React, { useContext } from 'react'
import { Form } from 'react-bootstrap';
import AppContext from 'context/AppContextProvider';

export default function PostGenreList({ genreTypes, genreList, setGenreTypes = f => f, checkHandler = f => f, checkedItemHandler = f => f }) {
    const { genreCodeList } = useContext(AppContext); //15개짜리
    //const [genId, setGenId] = useState([])

    const onCheck = ({ target }) => {
        checkedItemHandler(target?.parentNode, target?.value, target?.checked)
    }

    //setGenreTypes()
    return <Form>
        {genreCodeList?.map((gen, i) =>
            <Form.Check
                inline
                label={gen?.genre}
                name="checkGenre"
                type="checkbox"
                value={gen?.id}
                onChange={e => onCheck(e)}
                id={gen?.id}
                defaultChecked={genreList?.map((genre) => genre?.id).includes(gen?.id)}
            />
        )}
    </Form>
}
