import { Input } from "postcss";

export default function find() {
    return (
        <div>
            <h1>아이디비번찾기</h1>
            <div>
                <label>아이디찾기</label>
                <p>
                    <input type="string" />
                    <input type="string" />
                </p>
            </div>
            <div>
                <label>비번찾기</label>
                <p>
                    <input type="string" />
                    <input type="string" />
                </p>
            </div>
        </div>

    )
}