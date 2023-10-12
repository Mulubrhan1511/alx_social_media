<div className="d-flex flex-row justify-content-start">
          <img
            src={selectedFollower.pic}
            alt="avatar"
            className="d-flex align-self-center me-3"
            style={{ width: "60px", height: "40px", borderRadius: "40px" }}
          />
          <div>
            <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: '#f5f6f7' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-end">
          <div>
            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
          </div>
          <img
            src={user.pic}
            alt="avatar"
            className="d-flex align-self-center me-3"
            style={{ width: "60px", height: "40px", borderRadius: "40px" }}
          />
        </div>
const ChatSection = ({ selectedFollower, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    // Send the message to the server
    // You can use fetch or any other library to make the API request
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        recipientId: selectedFollower._id,
        content: message,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server if needed
        console.log('Message sent:', data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error sending message:', error);
      });

    // Clear the input field after sending the message
    setMessage('');
  };
  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages', {
        headers: {
          // Add your headers here
          Authorization: "Bearer " + localStorage.getItem("jwt")
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      console.log("Messages",data)
      setMessages(prevMessages => [...prevMessages, ...data]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  if (!selectedFollower) {
    return <div className="col-md-6 col-lg-7 col-xl-8" style={{ marginBottom: '4px', marginBottom: '0', overflowY: 'auto' }}></div>;
  }

  return (
    
    <div className="col-md-6 col-lg-7 col-xl-8" style={{ marginBottom: '4px', marginBottom: '0', overflowY: 'auto' }}>
     { messages.map((message) => (
  <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }} key={message.id}>
    {/* Chat messages */}
    <div className="d-flex flex-row justify-content-end">
      <div>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
      </div>
      <img
        src={user.pic}
        alt="avatar"
        className="d-flex align-self-center me-3"
        style={{ width: "60px", height: "40px", borderRadius: "40px" }}
      />
    </div>
  </div>
))}
      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img src={user.pic} alt="avatar 3" style={{ width: "60px", height: "40px", borderRadius: "40px" }} />
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
        <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
        <a className="ms-3" href="#!" onClick={sendMessage}><i className="fas fa-paper-plane"></i></a>
      </div>
    </div>
    
  );
};