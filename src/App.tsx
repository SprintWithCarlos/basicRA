import { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client';
const ENDPOINT = "http://localhost:3001"
interface Message {
  id: string;
  msg: string;
}
function App() {
  const [inputValue, setInputValue] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState('')
  const [chatMsg, setChatMsg] = useState<Message[]>([])
  useEffect(() => {
    const socket: any = socketIOClient(ENDPOINT);
    if (submittedMessage) {
      socket.emit('chat message', submittedMessage)
    }
    socket.on('chat message', (msg: Message) => {
      console.log(msg);
      console.log({ chatMsg });

      setChatMsg([...chatMsg, msg]);
    })

    return () => socket.disconnect();
  }, [submittedMessage])
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setSubmittedMessage(e.target.elements.chat.value)
    setInputValue('')

  }
  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value)

  }
  const ChatList = (): JSX.Element => {
    const elem: any = chatMsg.map((item: Message) => (<><li key={item.id}>{item.msg}</li></>)
    )
    return elem;
  }








  return (
    <div className="App" >
      <form action="" onSubmit={handleSubmit}>
        <input type="text" id="chat" name="chat" onChange={handleChange} value={inputValue} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        <ChatList />
      </ul>


    </div >
  );
}

export default App;
