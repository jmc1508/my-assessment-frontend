import React, { Component } from 'react';
import axios from 'axios';
import { Image,
        Table,
        Header,
        Grid,
        List,
        Divider} from 'semantic-ui-react';
// Style
import '../App.css'
import logo from '../logo.svg'

const api_key=process.env.REACT_APP_NEWS_API

// Styles
const divBody={
    height:'100vh',
    paddingTop:'50px'
}

const header={
    marginTop:'14px'
}



class NewsAPI extends Component {

    state={
        news_data:[],
        isLoading:true,
    }

    componentDidMount = () => {

        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/top-headlines',

            params:{
                country:"us",
                category:"business",
                pageSize:"20",
                apiKey:api_key
            }
            
        })
        .then(response => {
            console.log(response.data)
            this.setState({news_data:response.data['articles'],
                                isLoading:!this.state.isLoading})
        })
  
        .catch(error=>{
            console.log('ERROR: ', error)
  
        })
    }


    render() {
        const {news_data, isLoading}= this.state

          return (
            <div style={divBody}>


                <Header style={header} as='h2'>Top News Headlines</Header>

                <Divider/>
                {isLoading?
                    <Grid className="gridHeight">
                        <Grid.Column verticalAlign='top'>
                            <img className="App-logo" src={logo}/>
                        </Grid.Column>
                    </Grid>   
                :
                    <Grid column={3}>

                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12} textAlign='left'>
                                <List>
                                    <List.Item>API Source: News API</List.Item>
                                </List>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>

                    </Grid.Row>

                    <Grid.Row>

                    {/* Column 1 */}
                        <Grid.Column width={2}></Grid.Column>
                    {/* Column 2 */}
                        <Grid.Column width={12}>
                            <Table celled textAlign='left'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Image</Table.HeaderCell>
                                        <Table.HeaderCell>Author</Table.HeaderCell>
                                        <Table.HeaderCell>Headline</Table.HeaderCell>
                                        <Table.HeaderCell>Content</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                
                                {news_data.map(news=>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Image size='medium' src={news.urlToImage}></Image>
                                        </Table.Cell>
                                        <Table.Cell>{news.source["name"]}</Table.Cell>
                                        <Table.Cell ><a href={news.url}>{news.title}</a></Table.Cell>

                                        {news.content==null?
                                            <Table.Cell>n.a.</Table.Cell>:
                                            <Table.Cell>{news.content}</Table.Cell>}
                                        
                                    </Table.Row>
                                </Table.Body>
                                )}
                            </Table>
                        </Grid.Column>
                        {/* Column 3 */}
                        <Grid.Column width={2}></Grid.Column>

                        </Grid.Row>
                    </Grid>

                }
            </div>
        );
    }
}

export default NewsAPI;