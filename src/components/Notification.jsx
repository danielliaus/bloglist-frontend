const Notification = ({ message }) => {
  if (message) {
    return (
      <>
        <p>{message}</p>
      </>
    );
  }
};

export default Notification;
