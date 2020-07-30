import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { NavLink } from "react-router-dom";
import Loading from "@/components/Loading";
import PopCard from "./components/PopCard";
import styles from "./index.less";

const url = [
  {
    title: "All",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories",
  },
  {
    title: "JavaScript",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories",
  },
  {
    title: "Ruby",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories",
  },
  {
    title: "Java",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories",
  },
  {
    title: "CSS",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories",
  },
  {
    title: "Python",
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1+language:python&sort=stars&order=desc&type=Repositories",
  },
];

class Popular extends Component {
  state = {
    url:
      "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories",
    fetching: false,
    list: [],
    total: 0,
    page: 1,
  };

  componentDidMount() {
    const language = window.location.href.split("=")[1] || "All";

    url.map((item) => {
      if (item.title === language) {
        this.fetch(item.url);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    if (prevProps.location.search !== search && !search) {
      console.log("hello");
      this.fetch(url[0].url);
    }
  }

  handleClick = (item) => {
    this.setState({
      url: item.url,
    });

    this.fetch(item.url);
  };

  fetch = async (url, page, concat) => {
    const { list } = this.state;
    const finalUrl = page
      ? `${url}&page=${page}&per_page=10`
      : `${url}&per_page=10`;

    if (this.state.url !== url) {
      await this.setState({
        list: [],
      });
    }

    this.setState({
      fetching: true,
      errMsg: null,
    });

    try {
      const res = await axios.get(finalUrl);

      if (concat) {
        this.setState({
          list: list.concat(res.data.items),
        });
      } else {
        this.setState({
          list: res.data.items,
          total: res.data.total_count,
        });
      }
    } catch (e) {
      console.log(e.response.statusText);

      this.setState({
        errMsg: e.response.statusText,
      });
    }

    this.setState({
      fetching: false,
    });
  };

  getMore = async () => {
    const { total, list, url, page, fetching } = this.state;

    if (total === list.length) return;
    if (fetching) return;

    await this.setState({
      page: page + 1,
    });

    this.fetch(url, this.state.page, "concat");
  };

  render() {
    const { list, fetching, errMsg } = this.state;
    const language = window.location.href.split("=")[1] || "All";

    const navBarStyle = {
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
      fontSize: 20,
    };
    const contentStyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      maxWidth: "1200px",
      margin: "0 auto",
      marginTop: "20px",
    };

    return (
      <>
        {/* 导航栏 */}
        <ul style={navBarStyle}>
          {url.map((item) => (
            <li
              key={item.title}
              style={{ padding: "0 5px" }}
              onClick={() => this.handleClick(item)}
            >
              <NavLink
                className={language === item.title ? styles.active : "null"}
                to={{ pathname: "/popular", search: `?language=${item.title}` }}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 列表 */}
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.getMore}
          hasMore={!fetching}
          loader={null}
        >
          <ul style={contentStyle}>
            {list.map((item, key) => (
              <PopCard item={item} index={key} key={key} />
            ))}
          </ul>
          {fetching && <Loading />}
          {errMsg && (
            <div style={{ textAlign: "center", marginTop: 50, color: "red" }}>
              {errMsg}
            </div>
          )}
        </InfiniteScroll>
      </>
    );
  }
}

export default Popular;
