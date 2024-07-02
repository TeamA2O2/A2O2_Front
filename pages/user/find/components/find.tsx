import { Input } from "postcss";

export default function find() {

    const [user,setUser]=useState({});

    const InputData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,[event.target.name]:event.target.value
            };
        });
    }

    const FindId = async () => {
        const data = user;

        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/findId`,{data})
            .then((res)=> {
                console.log(process.env.Back_URL)
                console.log(res)
                navigator(-1)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const FindPassword = async () => {
        const data = user;

        try{
            await axios.post(`https://ao-rztme.run.goorm.site/user/findPassword`,{data})
            .then((res)=> {
                console.log(process.env.Back_URL)
                console.log(res)
                navigator(-1)
            })
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>아이디비번찾기</h1>
            <div>
                <label>아이디찾기</label>
                <p>
                    <input onChange={InputData} name="email" />
                    <button>찾기</button>
                </p>
            </div>
            <div>
                <label>비번찾기</label>
                <p>
                    <input onChange={InputData} name="email" />
                    <input onChange={InputData} name="id" />
                    <button>찾기</button>
                </p>
            </div>
        </div>

    )
}