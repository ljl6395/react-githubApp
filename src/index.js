// import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// 导航栏
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.navLi = [
            { title: 'All', src: 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories' },
            { title: 'JavaScript', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories' },
            { title: 'Ruby', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories' },
            { title: 'Java', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories' },
            { title: 'CSS', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories' },
            { title: 'Python', src: 'https://api.github.com/search/repositories?q=stars:%3E1+language:python&sort=stars&order=desc&type=Repositories' }
        ]

    }

    handleClick = (e) => {
        this.props.getData(e.target.name)
    }
    render() {
        const navbarStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
        }
        const navbarLiStyle = {
            margin: '0 5px',
            cursor: 'pointer',
            fontSize: '20px',
        }

        const navList = this.navLi.map((item, key) =>
            <li style={navbarLiStyle} key={item.title}><a name={item.src} onClick={this.handleClick}>{item.title}</a></li>)


        return (
            <ul style={navbarStyle}>
                {navList}
            </ul>
        )
    }
}


// 内容
class ContentBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories',
            repo: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.fetch()


    }

    async componentWillReceiveProps(newProps) {
        if (newProps.getSrc !== this.props.getSrc) {
            const { getSrc } = newProps;
            await this.setState({ url: getSrc })
            this.fetch()
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState !== this.state) {
    //         this.setState({url: this.props.getSrc})
    //         this.fetch()
    //     }
    // }


    fetch = async () => {

        const { url } = this.state
        this.setState({
            loading: true
        })

        try {
            const res = await axios.get(url)
            console.log('res', res.data)
            this.setState({
                repo: res.data.items
            })

        } catch (e) {
            console.log(e)
        }

        this.setState({
            loading: false
        })

    }

    render() {
        const { url, loading, repo } = this.state
        const number = 0
        // <li key={item.id}>{item.name}</li>
        const list = repo.map((item, key) =>
            <Box key={item.id} msg={item} index={key} />
        )
        const contentStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            maxWidth: '1200px',
            margin: '0 auto'
        }
        return (
            <ul style={contentStyle}>
                {loading ? <p style={{ fontSize: '32px' }}>loading...</p> : list}
            </ul>
        )
    }
}

// 卡片
class Box extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { msg, index } = this.props

        const boxStyle = {
            height: '460px',
            width: '288px',
            background: '#ebebeb',
            marginBottom: '15px',
            borderRadius: "5px"
        }
        return (
            <li style={boxStyle}>
                <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '36px' }}>#{index + 1}</p>
                <div style={{ width: '160px', height: '160px', margin: '0 auto', marginTop: '30px' }}><img style={{ width: '160px', height: '160px' }} src={msg.owner.avatar_url}></img></div>
                <h3 style={{ textAlign: 'center', marginTop: '15px' }}><a style={{ color: '#bd3251' }}>{msg.name}</a></h3>
                <ul style={{ marginTop: '15px', marginLeft: '20px' }}>
                    <li style={{ marginBottom: '5px' }}><i class="fa fa-user" aria-hidden="true" style={{ color: '#fec077', width: '15px' }} /> {msg.name}</li>
                    <li style={{ marginBottom: '5px' }}><i class="fa fa-code-fork fa-lg" aria-hidden="true" style={{ color: '#ffd700', width: '15px' }} /> {msg.forks_count}</li>
                    <li style={{ marginBottom: '5px' }}><i class="fa fa-star" aria-hidden="true" style={{ color: '#86c5f4', width: '15px' }} /> {msg.stargazers_count}</li>
                    <li style={{ marginBottom: '5px' }}><i class="fa fa-exclamation-triangle" aria-hidden="true" style={{ color: '#f09fa6', width: '15px' }} /> {msg.open_issues_count}</li>
                </ul>
            </li>
        )
    }
}




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { src: '' }
    }

    handleGetData = (val) => {
        // console.log(val)
        this.setState({ src: val })
    }

    render() {
        return (
            <div>
                <div style={{ overflow: 'hidden', height: '150px' }}>
                <Navbar getData={this.handleGetData} />
                </div>
                <ContentBox getSrc={this.state.src} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)


