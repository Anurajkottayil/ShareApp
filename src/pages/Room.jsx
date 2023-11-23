import { useEffect, useState } from "react"

import { DATABASE_ID, databases,COLLECTION_ID_MESSAGES } from "../appwriteConfig"
import { ID} from  'appwrite'

const Room = () => {
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')
  useEffect (() => {
    getMessages()
  },  [])

const handleSubmit = async (e) => {
  e.preventDefault()
  let payload = {
    body:messageBody
  }
  let response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID_MESSAGES,
    ID.unique(),
    payload
    )
    console.log('Created!',response)
    setMessages(prevState => [response,...messages])
    setMessageBody('')
  }
  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID,COLLECTION_ID_MESSAGES,message_id)
    setMessages(prevState => messages.filter(message => message.$id!== message_id))
  }


  
  const getMessages = async() => {

    const response = await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES)
     console.log('RESPONSE:',response)
     setMessages(response.documents)
    
  }

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form" action="">
          <div>
            <textarea required maxLength={1000}  value={messageBody} placeholder="say something" onChange={(e) => {setMessageBody(e.target.value)}}></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send" />
          </div>
        </form>
    <div>
      <div>
        {messages.map(message => (
          <div key={message.$id} className="message--wrapper">
            <div className="message--header">
            <small className="message-timestamp"><p>{messages.$createdAt}</p></small>  
            <button className="delete--btn" onClick={() => {deleteMessage(message.$id)}}></button>
            </div>
           <div className="message--body">
              <span>{message.body}</span>
           </div>
          </div>
        ))}
      </div>

      </div>
    </div>
    </main>
  )
}

export default Room