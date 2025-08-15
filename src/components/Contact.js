const Contact = () => {
  return (
    <div>
      <h1 className="text-3xl p-4 m-4">Contac page</h1>
      <form className=" p-4 m-4">
        <input
          className="border p-2 m-4 rounded-md"
          placeholder="Name"
          type="text"
        />
        <input
          className="border p-2 m-4 rounded-md"
          placeholder="Phon.no"
          type="text"
        />
        <button className=" px-4 py-2 bg-gray-300 rounded-lg hover:cursor-pointer">Submit</button>
      </form>
    </div>
  );
}

export default Contact;