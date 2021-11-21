import React, {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';

function App({ fixed }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState('');
  // const [session, setSession] = useState([]);
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original";
  
  const handleSubmit = event => {
    event.preventDefault();
  
    const post = {
     value: rating
    };
  
    axios.post(`https://api.themoviedb.org/3/movie/671583/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`, post, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      
    })
   .then(res => {
      console.log(res);
      console.log(res.data);
      getDataUserProfile();

      // window.location.reload();
     })
     .catch(error => {
       console.log(error);
     })
   }

   const handleDelete = event => {
    event.preventDefault();
  
    axios.delete(`https://api.themoviedb.org/3/movie/671583/rating?api_key=${process.env.REACT_APP_API_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      
    })
   .then(res => {
      console.log(res);
      console.log(res.data);
      getDataUserProfile();
      // window.location.reload();
     })
     .catch(error => {
       console.log(error);
     })
   }

  const getData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/671583?api_key=${process.env.REACT_APP_API_KEY}`).then(response =>{
      console.log(response.data)
      console.log(response.data.genres)
      setData(response.data);
      setGenres(response.data.genres);
    }).catch(error =>{
      console.log(error);
    })
  }

  const getDataUser = () => {
    axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`).then(response =>{
      console.log(response.data);
      setUser(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const getDataUserProfile = () => {
    axios.get(`https://api.themoviedb.org/3/account/11393983/rated/movies?api_key=${process.env.REACT_APP_API_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`).then(response =>{
      console.log(response.data);
      setUserProfile(response.data.results);
    }).catch(error =>{
      console.log(error);
    })
  }

  // const getGuestSession = () => {
  //   axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`).then(response =>{
  //     // console.log(response.data);
  //     setSession(response.data);
  //   }).catch(error =>{
  //     console.log(error);
  //   })
  // }

  useEffect( () => {
    getData();
    getDataUser();
    getDataUserProfile();
    // getGuestSession();
    // console.log(session.guest_session_id);
  }, []);

  return (
      <div className="flex flex-wrap py-2">
        <div className="w-full px-4">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-800 rounded">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <a
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  href="#pablo"
                >
                  Jilan Movie
                </a>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                      Movie
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                      Contact
                    </a>
                  </li>
                  <button className="text-indigo-300 bg-transparent border border-solid border-indigo-300 hover:bg-indigo-500 hover:text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Login
                  </button>
                </ul>
              </div>
            </div>
          </nav>
          <nav className="text-sm text-left text-blue-700 bg-blue-400 bg-opacity-10 h-12 flex items-center p-4 rounded-md" role="alert">
            <ol className="list-reset flex text-grey-dark m-4">
                <li><a href="#" className="font-bold">Home</a></li>
                <li><span className="mx-2">/</span></li>
                <li><a href="#" className="font-bold">All Movie</a></li>
                <li><span className="mx-2">/</span></li>
                <li id="title">{data.title}</li>
            </ol>
        </nav>
        <section>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
            <div className="flex flex-wrap items-center mx-auto max-w-7xl">
              <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                <div>
                  <div className="relative w-full max-w-lg">
                    <div className="
                  absolute
                  top-0
                  rounded-full
                  bg-violet-300
                  -left-4
                  w-72
                  h-72
                  mix-blend-multiply
                  filter
                  blur-xl
                  opacity-70
                  animate-blob
                "></div>
                    <div className="
                  absolute
                  rounded-full
                  bg-fuchsia-300
                  -bottom-24
                  right-20
                  w-72
                  h-72
                  mix-blend-multiply
                  filter
                  blur-xl
                  opacity-70
                  animate-blob
                  animation-delay-4000
                "></div>
                    <div className="relative">
                      <img className="object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src={imgUrl + data.poster_path}></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="
            flex flex-col
            items-start
            mt-12
            mb-16
            text-left
            lg:flex-grow lg:w-1/2 lg:pl-6
            xl:pl-24
            md:mb-0
            xl:mt-0
          ">
                <span id="tagline" className="mb-8 text-xs font-bold tracking-widest text-blue-400 uppercase">{data.tagline}</span>
                <h1 id="title-h1" className="
              mb-8
              text-4xl
              font-bold
              leading-none
              tracking-tighter
              text-neutral-600
              md:text-7xl
              lg:text-5xl
            ">{data.title}</h1>
                <p id="overview" className="mb-8 text-base leading-relaxed text-left text-gray-300">{data.overview}</p>
                <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
                  <div className="prose prose-md">
                      {genres.map((genresList, index) => {
                        return <span id="genre-2" key={index} className="inline-flex items-center justify-center mx-2 px-2 py-1 text-xs font-bold leading-none bg-blue-200 text-blue-800 rounded">{genresList.name}</span>
                      })}
                      {/* <span id="genre-1" className="inline-flex items-center justify-center mx-2 px-2 py-1 text-xs font-bold leading-none bg-green-200 text-green-800 rounded">{data.genres[0].name}</span>
                      <span id="genre-2" className="inline-flex items-center justify-center mx-2 px-2 py-1 text-xs font-bold leading-none bg-blue-200 text-blue-800 rounded">{data.genres[1].name}</span>
                      <span id="genre-3" className="inline-flex items-center justify-center mx-2 px-2 py-1 text-xs font-bold leading-none bg-purple-200 text-purple-800 rounded">{data.genres[2].name}</span> */}
                  </div>
                </div>

                <div class="w-full max-w-xs mt-10">
                  <form class="">
                    <div class="mb-4">
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Rate Movie" value={rating} onChange={e => setRating(e.target.value)}></input>
                    </div>
                    <div class="flex items-center justify-between">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                
                <section class="text-gray-600">
                  <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col">
                      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <div class="overflow-hidden sm:rounded">
                            <table class="min-w-full">
                              <thead class="bg-gray-50">
                                <tr>
                                  <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ">Username</th>
                                  <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ">Title</th>
                                  <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ">Rate</th>
                                  <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Delete</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                
                                {userProfile.map((profile, index) => {
                                  return <tr class="bg-white" key={index}>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900  whitespace-nowrap">{user.username}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{profile.original_title}</td>
                                    <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{profile.rating}</td>
                                    <td class="px-6 py-4 text-sm font-medium text-right  whitespace-nowrap">
                                      <a href="#" class="text-blue-600 hover:text-blue-900" onClick={handleDelete}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> 
                                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /> 
                                        </svg>
                                      </a>
                                    </td>
                                  </tr>
                                })}
                                
                                
                                {/* <tr class="bg-gray-50">
                                  <td class="px-6 py-4 text-sm font-medium text-gray-900  whitespace-nowrap"> Vercel </td>
                                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"> vercel.com </td>
                                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"> vercel@example.com </td>
                                  <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"> Hosting </td>
                                  <td class="px-6 py-4 text-sm font-medium text-right  whitespace-nowrap">
                                    <a href="#" class="text-blue-600 hover:text-blue-900">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                      </svg>
                                    </a>
                                  </td>
                                </tr> */}
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
        

              </div>
            </div>
          </div>
      </section>

      <footer class="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="px-5 py-12 mx-auto max-w-7xl lg:py-16 md:px-12 lg:px-20">
          <div class="xl:grid xl:grid-cols-3 xl:gap-8">
            <div class="space-y-8 xl:col-span-1">
              <a href="/" class="
            text-lg
            font-bold
            tracking-tighter
            text-blue-400
            transition
            duration-500
            ease-in-out
            transform
            tracking-relaxed
            lg:pr-8
          "> JilanMovie </a>
              <p class="w-1/2 mt-2 text-sm text-gray-300"> Enjoy ur movie! </p>
            </div>
            <div class="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
              <div class="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 class="
                text-xs
                font-semibold
                tracking-wider
                text-blue-400
                uppercase
              "> Solutions </h3>
                  <ul role="list" class="mt-4 space-y-4">
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Marketing </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Analytics </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Commerce </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Insights </a>
                    </li>
                  </ul>
                </div>
                <div class="mt-12 md:mt-0">
                  <h3 class="
                text-xs
                font-semibold
                tracking-wider
                text-blue-400
                uppercase
              "> Support </h3>
                  <ul role="list" class="mt-4 space-y-4">
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Pricing </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Documentation </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> Guides </a>
                    </li>
                    <li>
                      <a href="#" class="text-sm font-normal text-gray-300 hover:text-gray-900"> API Status </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="hidden lg:justify-end md:grid md:grid-cols-1">
                <div class="w-full mt-12 md:mt-0">
                  <div class="mt-8 lg:justify-end xl:mt-0">
                    <h3 class="
                  text-xs
                  font-semibold
                  tracking-wider
                  text-blue-400
                  uppercase
                "> Subscribe to our newsletter </h3>
                    <p class="mt-4 text-sm text-gray-300 lg:ml-auto"> The latest news, articles, and resources, sent to your inbox weekly. </p>
                    <div class="inline-flex items-center gap-2 list-none lg:ml-auto">
                      <form action="" method="post" id="revue-form" name="revue-form" target="_blank" class="
                    p-1
                    mt-4
                    transition
                    duration-500
                    ease-in-out
                    transform
                    border2
                    bg-gray-50
                    rounded-xl
                    sm:max-w-lg sm:flex
                  ">
                        <div class="flex-1 min-w-0 revue-form-group">
                          <label for="member_email" class="sr-only">Email address</label>
                          <input id="cta-email" type="email" class="
                        block
                        w-full
                        px-5
                        py-3
                        text-base text-neutral-600
                        placeholder-gray-300
                        transition
                        duration-500
                        ease-in-out
                        transform
                        bg-transparent
                        border border-transparent
                        rounded-md
                        focus:outline-none
                        focus:border-transparent
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-gray-300
                      " placeholder="Enter your email  "></input>
                        </div>
                        <div class="mt-4 sm:mt-0 sm:ml-3 revue-form-actions">
                          <button type="submit" value="Subscribe" name="member[subscribe]" id="member_submit" class="
                        block
                        w-full
                        px-5
                        py-3
                        text-base
                        font-medium
                        text-white
                        bg-blue-400
                        border border-transparent
                        rounded-lg
                        shadow
                        hover:bg-blue-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-gray-300
                        sm:px-10
                      "> Notify me </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="
      px-5
      py-12
      mx-auto
      bg-gray-50
      max-w-7xl
      sm:px-6
      md:flex md:items-center md:justify-between
      lg:px-20
    ">
          <div class="flex justify-center mb-8 space-x-6 md:order-last md:mb-0">
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Facebook</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Instagram</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">GitHub</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Dribbble</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
          <div class="mt-8 md:mt-0 md:order-1">
            <span class="mt-2 text-sm font-light text-gray-300"> Copyright © 2021 <a href="https://wickedlabs.dev" class="mx-2 text-wickedblue hover:text-gray-300" rel="noopener noreferrer">@nafisariqo</a>. Since 2021 </span>
          </div>
        </div>
    </footer>
        </div>
      </div>
      
  );
}

export default App;