import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../App";
import { useParams } from 'react-router-dom';

const FollowerList = ({ followers, setSelectedFollower }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      console.log('Messages', data);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log("new messages", messages)
  return (
    
    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
      <div className="input-group rounded mb-3">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>

      <div className="p-3">
        <div
          className="chat-contact-list"
          data-mdb-perfect-scrollbar="true"
          style={{ position: 'relative', height: '400px', overflowY: 'auto' }}
        >
          <ul className="list-unstyled mb-0">
            {followers.map((follower) =>
              messages.some((message) => message.sender._id === follower._id || message.recipient._id === follower._id) ? (
                <li className="p-2 border-bottom" key={follower.id}>
                  <a href="#" className="d-flex justify-content-between" onClick={() => setSelectedFollower(follower)}>
                    <div className="d-flex flex-row">
                      <div>
                        <img
                          src={follower.pic}
                          alt="avatar"
                          className="d-flex align-self-center me-3"
                          style={{ width: '60px', height: '60px', borderRadius: '40px' }}
                        />
                        <span className="badge bg-warning badge-dot"></span>
                      </div>
                      <div className="pt-1">
                        <p className="fw-bold mb-0">{follower.name}</p>
                        <p className="small text-muted">Lorem ipsum dolor sit.</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1">Yesterday</p>
                    </div>
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
const ChatSection = ({ selectedFollower, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null); // Create a ref for the input element

  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      console.log('Messages', data);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  const sendMessage = async () => {
    try {
      const response = await fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          recipientId: selectedFollower._id,
          content: message,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      console.log('Message sent:', data);
  
      // Clear the input field after sending the message
      setMessage('');
      inputRef.current.value = ''; // Reset the input field using the ref
  
      // Fetch the latest messages after sending a new message
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedFollower]);

  if (!selectedFollower) {
    return (
      <div className="col-md-6 col-lg-7 col-xl-8" style={{ marginBottom: '4px', marginBottom: '0', overflowY: 'auto' }}>
      </div>
    );
  }

  return (
    <div className="col-md-6 col-lg-7 col-xl-8" style={{ marginBottom: '4px', marginBottom: '0', overflowY: 'auto' }}>
      <div className="pt-3 pe-3 overflow-auto" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
        {/* Chat messages */}
        {messages.map((message) =>
          message.recipient._id === selectedFollower._id || message.sender._id === selectedFollower._id ? (
            message.sender._id==user._id?(
              <div className="d-flex flex-row justify-content-end" key={message.id}>
              <div>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message.content}</p>
                <p className="small me-3 mb-3 rounded-3 text-muted">{message.timestamp}</p>
              </div>
              <img
                src={selectedFollower.pic}
                alt="avatar"
                className="d-flex align-self-center me-3"
                style={{ width: '60px', height: '40px', borderRadius: '40px' }}
              />
            </div>
            ):(
              <div className="d-flex flex-row justify-content-start" key={message.id}>
                    <img src={user.pic}
                      alt="avatar 1" style={{ width: '60px', height: '40px', borderRadius: '40px' }} />
                    <div>
                      <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f0f0f0' }}>{message.content}
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                    </div>
                  </div>
            )

            
          ) : null
        )}
      </div>

      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img src={user.pic} alt="avatar 3" style={{ width: '60px', height: '40px', borderRadius: '40px' }} />
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef} // Assign the ref to the input element
        />
        <a className="ms-1 text-muted" href="#!">
          <i className="fas fa-paperclip"></i>
        </a>
        <a className="ms-1 text-muted" href="#!">
        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
          <li><a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a></li>
          <li><a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a></li>
        </ul>
        </a>
        
        
        <a className="ms-3" href="#!" onClick={sendMessage}>
          <i className="fas fa-paper-plane"></i>
        </a>
      </div>
    </div>
  );
};


const Message = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/followers`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        const data = await response.json();
        console.log("Fetched followers:", data); // Log the fetched data
        setFollowers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowers();
  }, []);

 

  return (
    <div>
      <section style={{ backgroundColor: '#CDC4F9' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <div className="row">
                    <FollowerList followers={followers} setSelectedFollower={setSelectedFollower} />
                    <ChatSection selectedFollower={selectedFollower} user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Message;