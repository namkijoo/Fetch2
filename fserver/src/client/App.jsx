import "./App.css";
import React, {useState, useEffect} from "react";;
const serverURL = "http://localhost:65020/users";

function App() {
    const [values, setValues] = useState({email: "", password: ""});
    const [userData, setUserData] = useState(null);
    const [cont, setCont] = useState("");
    const [tf, setTF] = useState(false);

    const change = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const getUserData = () => {
        fetch(serverURL)
            .then((res) => res.json())
            .then((data) => setUserData(data))
            .then(console.log(userData))
    }

    useEffect(getUserData, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;
        console.log("Submit버튼 클릭후 서버로 POST전송");
        fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, id, passwd})
        }).then(getUserData());
    }

    const chan = () => {
        setTF(true);
    }

    const [a, setA] = useState("");

    const submit = (event) => {
        event.preventDefault();
        setCont('아니네요')
        userData.map((user, i) => (
            user.id == values.email && user.passwd == values.password
                ? setCont('맞네요')
                : null
        ));

    }

    return (
        <> 
            < div >
                <h2>회원등록</h2>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" name="name" placeholder="이름"></input>
                    <input type="text" name="id" placeholder="아이디"></input>
                    <input type="text" name="passwd" placeholder="암호"></input>
                    <button type="submit">등록</button>
                </form>
            </div>
            <p></p>
        <div>+
            <h2>회원확인</h2>
            <form onSubmit={submit}>
                <input
                    type="text"
                    name="email"
                    value={values.email}
                    placeholder="아이디"
                    onChange={change}></input>
                <input
                    type="text"
                    name="password"
                    value={values.password}
                    placeholder="암호"
                    onChange={change}></input>
                <button type="submit">확인</button>
            </form>
        </div>
        <p id="alert">{cont}</p> 
        < div > 
            <h2>회원목록</h2>
            <ol>
                {
                    (userData === null)
                        ? (<p>서버에서 데이터를 가저오는 중...</p>)
                        : (userData.map((user, i) => (
                            <li key={user.keyid}>{user.name}
                                {user.id}
                                {user.passwd}</li>
                        )))
                }
            </ol>
        </div>
    </>
    )
}

export default App;