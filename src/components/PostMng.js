import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import AttachedFileList from 'atom/AttachedFileList';
import ThumbnailList from 'atom/ThumbnailList';
import PostGenreList from './PostGenreList';

export default function PostMng() {
	const location = useLocation();
	const { auth } = useContext(AppContext);
	const post = location.state?.post;
	console.log("포스트 나와라 오버", post)
	const state = location.state;
	console.log(state);
	const parentId = location.state?.parentId;
	const navigate = useNavigate();
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.content);
	const [listAttach, setListAttach] = useState(post?.listAttachFile);
	const isComplete = useState(1);
	let hTier;
	const [genreTypes, setGenreTypes] = useState(state?.isSeries ? post?.genreList?.map((genre) => genre?.id) : []);
	console.log(genreTypes);
	const checkedItemHandler = (box, code, isChecked) => {
		if (isChecked) { //체크 되었을때 
			setGenreTypes([...genreTypes, code])

		} else if (!isChecked && genreTypes?.find(one => one === code)) { //체크가 안되었고, id가 있을때(클릭 2번시) 
			const filter = genreTypes?.filter(one => one !== code)
			setGenreTypes([...filter]);

		}
	};

	const [hasAllContents, setHasAllContents] = useState();
	useEffect(() => {
		setHasAllContents(title?.trim() ? content?.trim() : false);
	}, [title, content])

	const handleSubmit = async (e) => {

		e.preventDefault();
		console.log(parentId + "----")
		if (!hasAllContents)
			return;
		const writer = { id: auth?.userId, nick: auth?.nick, loginId: auth?.loginId };
		const bodyData = {
			writer: writer, id: post?.id ? post.id : parentId + "----", boardVO: { id: (state && state?.boardId != 0 ? state?.boardId : post?.boardVO?.id) },
			title: title.trim(), content: content.trim(), hTier, isComplete: isComplete[0], listAttachFile: listAttach,
			genreList: genreTypes.map(gen => {
				return { id: gen }
			}),
		};
		console.log(JSON.stringify(bodyData));

		try {
			await axios.post(
				"/work/manageWork",
				bodyData,
				{
					headers: {
						'Content-Type': 'application/json',
						"x-auth-token": `Bearer ${auth?.accessToken}`
					}
				}
			);

			if (!post?.id) {
				console.log('//글쓰기 ttt');
				navigate(-1, { state: { boardId: post?.boardVO?.id, page: 1, search: "" } });
			} else {
				console.log('수정', post);
				navigate(-1, { state: state });
			}

		} catch (err) {
			console.log('Registration Failed', err);
		}
	}

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			const data = await axios.delete(`/work/${post?.id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						"x-auth-token": `Bearer ${auth.accessToken}`
					}
				});
		} catch (err) {
			console.log('Delete Failed', err);
		} finally {
			console.log('Delete state', state);
			navigate(-1, { state: state });
		}
	}

	return <Form>
		<h3>글쓰기</h3>
		<Form.Group className="mb-3" >
			<Form.Control
				type="text"
				value={title}
				id="title"
				placeholder="글제목"
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
		</Form.Group>
		{state.isSeries ? <PostGenreList checkedItemHandler={checkedItemHandler} genreList={post.genreList} genreTypes={genreTypes} setGenreTypes={setGenreTypes} /> : ""}

		<Form.Group className="mb-3" >
			<Form.Control
				as="textarea"
				value={content}
				style={{ whiteSpace: "pre-line" }}
				rows="10"
				id="content"
				placeholder="글내용"
				onChange={(e) => setContent(e.target.value)}
				required
			/>
		</Form.Group>
		<ThumbnailList imgDtoList={listAttach} />
		<AttachedFileList writer={auth} listAttach={listAttach} setListAttach={setListAttach} />
		<Button variant="outline-primary" onClick={handleSubmit} disabled={!hasAllContents} >
			반영
		</Button>
		<Button variant="outline-dark" onClick={handleDelete}>
			삭제
		</Button>

	</Form>
}

