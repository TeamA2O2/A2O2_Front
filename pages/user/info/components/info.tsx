export default function info() {

    const [list, getList] = useState({});

    const [user,setUser] = useState({});

    const getFundinglist = async () => {
        try {
            await axios.post(`https://ao-rztme.run.goorm.site/user/info`)
                .then(async (res) => {
                    const data = res.data.list;

                    await getList(data);

                })

        } catch (error) {

        }
    }

    return (
        <div>
            <h1>{user.name} </h1>
            <div>{user.image}</div>
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div>
                                <h3>상품명</h3>
                                <h3>진행도 바</h3>
                                <div>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}