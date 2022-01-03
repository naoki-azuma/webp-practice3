import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Let's Trivia</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div class="box has-text-centered">
      <h2>Question {props.count+1}</h2>
      <p>Category:{props.src.category.replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</p>
      <h2 className="has-text-weight-bold">{props.src.question.replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</h2>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Question(props){
  const questionArray=props.src.incorrect_answers.concat();
  questionArray.push(props.src.correct_answer);
  questionArray.sort();

  const judgeCorect = (num) => {
    if(questionArray[num]==props.src.correct_answer){
      props.setCorect((prevCount)=>prevCount+1);
    }
    props.countIncrement();
  }

  return (
    <div className="buttons is-centered">
      <button className="button is-danger" onClick={()=>judgeCorect(0)}>{questionArray[0].replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</button>
      <button className="button is-primary" onClick={()=>judgeCorect(1)}>{questionArray[1].replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</button>
      <button className="button is-warning" onClick={()=>judgeCorect(2)}>{questionArray[2].replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</button>
      <button className="button is-info" onClick={()=>judgeCorect(3)}>{questionArray[3].replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g,'&')}</button>
    </div>
  );
}

function Gallery(props) {
  const InitialCount=0
  const urls = props.urls;

  const [count, setCount] = useState(InitialCount);

  const changePage = () =>{
    props.setTop(3);
  }

  const countIncrement= () => {
      if(count==urls.length-1){
        changePage();
      }else{
        setCount((prevCount)=> prevCount+1);
      }
  }

  if (urls == null) {
    return <Loading />
  }
  return (
    <div>
      <div className="content">
        <Image src={urls[count]} count={count} />
      </div>
      <div className="content">
        <Question src={urls[count]} setCorect={props.setCorect} corect={props.corect} countIncrement={countIncrement}/>
      </div>
    </div>
   
  );
}

function Homepage(props){
  const changePage = () =>{
    props.setTop(2);
  }
  return (
    <div>
      <div className="content">
        <h1 className="title is-1">trivia in English</h1>
        <p>10のトリビアを用意しました。</p>
        <p>問題は全て英語になっています。</p>
        <p>下のボタンを押して始めてみましょう。</p>
      </div>
      <div className="content">
        <button className="button is-black is-large" onClick={changePage}>start</button>
      </div>
    </div>
  );
}

function Comment(props){ 
  if(props.corect===10){
    return <h1 className="title is-1">Unbelievable!!!</h1>
  }else if(props.corect>=7){
    return <h1 className="title is-1">Fantastic!!</h1>
  }else if(props.corect>=3){
    return <h1 className="title is-1">Good job!</h1>
  }else{
    return <h1 className="title is-1">Oh-no</h1>
  }
}

function Resultpage(props) {
  const changePage = () =>{
    props.setUrls(null);
    props.setRes((prevRes)=>prevRes+1);
    props.setCorect(0);
    props.setTop(1);
  }
  return (
    <div className="is-centered">
      <div className="content">
        <Comment corect={props.corect}/>
      </div>
      <div className="content">
        <h1 className="title is-1">{props.corect}/10</h1>
      </div>
      <div className="content">
        <button className="button is-black is-large" onClick={changePage}>Home</button>
      </div>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  const [top, setTop] = useState(1);
  const [corect, setCorect] = useState(0);
  const [res, setRes] = useState(0);

  useEffect(() => {
    fetchImages("10").then((urls) => {
      setUrls(urls);
    });
  }, [res]);

  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }

  if(top===1){
    return (
      <main>
        <section className="section">
          <div className="container has-text-centered">
            <Homepage setTop={setTop} corect={corect} setCorect={setCorect}/>
          </div>
        </section>
      </main>
    );
  }else if(top===2){
    return (
      <main>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} setTop={setTop} setCorect={setCorect} corect={corect}/>
          </div>
        </section>
      </main>
    );
  }else if(top===3){
    return (
      <main>
        <section className="section">
          <div className="container has-text-centered">
            <Resultpage setUrls={setUrls} setTop={setTop} setRes={setRes} corect={corect} setCorect={setCorect} />
          </div>
        </section>
      </main>
    );
  }
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="box">
          <p className="has-text-weight-bold">Let's Trivia are retrieved from Trivia API</p>
          <a href="https://opentdb.com/api_config.php">WEBsite to Trivia API</a>
        </div>
        <div className="m-1">
          <p className="m-1">5420084 東直輝</p>
          <p className="m-1">日本大学文理学部情報科学科 Webプログラミング 演習課題</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;