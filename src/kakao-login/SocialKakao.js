const SocialKakao = () => {
    const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return (
        <>
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <img src={process.env.PUBLIC_URL + `/images/kakao_login_medium_narrow.png`} width="160" height="40px" />
            </a>
        </>
    )
}

export default SocialKakao