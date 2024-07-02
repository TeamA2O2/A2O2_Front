export default function login() {

    const [user,getUser]=useState({});

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        getUser((prev) => {
            return {
                ...prev,[event.target.name]:event.target.value
            };
        });
    }

    const LoginUser = async () => {
        const data = user;

        try {
            await axios.post(`https://ao-rztme.run.goorm.site/user/signIn`,{data})
            .then((res)=>{
                console.log(res)
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>로그인</h1>
            <div>
                <label>아이디</label>
                <input  onChange={InputData} name="id" />
                <label>비번</label>
                <input  onChange={InputData} name="password" />
            </div>
            <button onClick={LoginUser}></button>
        </div>
    )
}