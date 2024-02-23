export default function ContentGenerator() {
  return (
    <form>
      <div>
        <label htmlFor="title">Title :</label>
        <input type="text" name="title" id="title" />
      </div>
      <div>
        <label htmlFor="content">Content :</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
      </div>
      <div>
        <p>Publish :</p>
        <label htmlFor="yes">
          Yes <input type="radio" name="publish" id="yes" value="yes" />
        </label>
        <label htmlFor="yes">
          No <input type="radio" name="publish" id="no" value="no" />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
