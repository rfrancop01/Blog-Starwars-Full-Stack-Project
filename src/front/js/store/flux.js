const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST",	background: "white", initial: "white"},
				{title: "SECOND", background: "white", initial: "white"}],
			baseURLContacts: "https://playground.4geeks.com/contact/agendas",
			slug: "Ricardo",
			contacts: [],
			currentContact: {},
			baseUrlStarwars: "https://www.swapi.tech/api",
			characters: [],
			planets: [],
			starships: [],
			currentCharacter: {},
			currentPlanet: {},
			currentStarship: {},
			favorites: [],
			paginationCharacter: [],


		},
		actions: {
			// Use getActions to call a function within a fuction
			setCurrentContact: (contact) => { setStore({ currentContact: contact}) },
			setCurrentCharacter: (value) => { setStore({ currentCharacter: value})},
			setCurrentPlanet: (value) => { setStore({ currentPlanet: value})},
			setCurrentStarship: (value) => { setStore({ currentStarship: value})},
			
			getCharacters: async () => {
				if (localStorage.getItem('characters')) {
					setStore( { 
						characters: JSON.parse(localStorage.getItem('characters')),
						paginationCharacter: JSON.parse(localStorage.getItem("paginationCharacter")),
					} );		
					return
				}
				const uri = `${getStore().baseUrlStarwars}/people`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				const pagination = [];
				for (let i = 1; i <= data.total_pages; i++) {
					pagination.push({
						link: `https://www.swapi.tech/api/people?page=${i}&limit=10`,
						previous: i === 1 ? null : `https://www.swapi.tech/api/people?page=${i-1}&limit=10`,
						next:  i === data.total_pages ? null : `https://www.swapi.tech/api/people?page=${i+1}&limit=10`,
					})}

				setStore( { 
					characters: data.results,
					paginationCharacter: pagination,
				} );		
				localStorage.setItem('characters', JSON.stringify(data.results))
				localStorage.setItem("paginationCharacter", pagination)
				console.log(data);
				
			},

			getCharacter: async (id) => {
				const uri = `${getStore().baseUrlStarwars}/people/${id}`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore( {currentCharacter: data.result.properties})
			},

			getPlanets: async () => {
				if (localStorage.getItem('planets')) {
					setStore( { planets: JSON.parse(localStorage.getItem('planets'))} );
					return
				}
				const uri = `${getStore().baseUrlStarwars}/planets`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore({planets: data.results});
				localStorage.setItem('planets', JSON.stringify(data.results))
			},

			getPlanet: async (id) => {
				const uri = `${getStore().baseUrlStarwars}/planets/${id}`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore( {currentPlanet: data.result.properties})
			},

			getStarships: async () => {
				if (localStorage.getItem('starships')) {
					setStore( { starships: JSON.parse(localStorage.getItem('starships'))} );
					return
				}
				const uri = `${getStore().baseUrlStarwars}/starships`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore({starships: data.results});
				localStorage.setItem('starships', JSON.stringify(data.results))
			},

			getStarship: async (id) => {
				const uri = `${getStore().baseUrlStarwars}/starships/${id}`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore( {currentStarship: data.result.properties})
			},
			
			addFavorite: (item) => {
				const store = getStore();  
				const favoriteItem = {
					uid: item.uid,
					name: item.name,
					type: item.type, 
				};
				setStore({
					...store,
					favorites: [...store.favorites, favoriteItem],
				});
			},
			
			removeFavorite: (name, type) => {
				const store = getStore();  
				setStore({
					...store,
					favorites: store.favorites.filter((fav) => fav.name != name),
				});
			},
			
			createUser: async () =>{
				const uri = `${getStore().baseURLContacts}/Ricardo`
				const options = {
					method: "POST"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error:', response.status, response.statusText)
					return  
				}
				
			},
			
			getContacts: async () => {
				const uri = `${getStore().baseURLContacts}/${getStore().slug}`;
				const options = {
					method: "GET"
				}
				const response = await fetch(uri, options);
				if(response.status === 404){
					getActions().createUser()
				}
				if (!response.ok) {
					console.log("error:", response.status, response.statusText);
				}
				const data = await response.json();
				setStore({contacts: data.contacts});
			},
			
			deleteContact: async (contactId) => {		
				const uri = `${getStore().baseURLContacts}/${getStore().slug}/contacts/${contactId}`;
				const options = {
					method: "DELETE"
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("error", response.status, response.statusText);
					return
				}
				getActions().getContacts();
			},

			addContact: async (dataToSend) => {
				const uri =`${getStore().baseURLContacts}/${getStore().slug}/contacts`
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error:', response.status, response.statusText)
					return  
				}
				getActions().getContacts()
			},
			exampleFunction: () => {getActions().changeColor(0, "green");},
			getMessage: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/hello")
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText);
					return;
				}
				const data = await response.json()
				setStore({ message: data.message })
				// don't forget to return something, that is how the async resolves
				return data;
			},
			editContact: async (id, contact) =>{
				const uri= `${getStore().baseURLContacts}/${getStore().slug}/contacts/${id}`
				const options = {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// Tratar el error
					return;
				}
				getActions().getContacts()
			},
			changeColor: (index, color) => {const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
