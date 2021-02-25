import './ResultCard.css';

const ResultCard = ({ result }) => {
  const {
    title,
    author,
    url,
    thumb_url_medium: thumbnail,
    pub_date: pubDate,
  } = result;

  const formattedDate = pubDate ? new Date(pubDate).toLocaleDateString() : '';

  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <div className="card">
        <div className="image-box">
          <img alt="" src={thumbnail} />
        </div>
        <div className={'title'}>{title}</div>
        <footer>
          <div className="information-row left">{author}</div>
          <div className="information-row right">
            <i>{formattedDate}</i>
          </div>
        </footer>
        <p></p>
      </div>
    </a>
  );
};

export default ResultCard;
