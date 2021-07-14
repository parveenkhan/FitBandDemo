import React, { Component } from "react";
import { View, Image, Dimensions, ActivityIndicator, StatusBar, Text, SafeAreaView, TouchableOpacity, FlatList, Platform } from 'react-native';

// custom classes delcare 
import { RFPercentage } from "../Utility/ScaleRatio";
import { ResHelper } from "../Res/ResHelper";
import { Header } from '../CustomComponents/CustomComponents';

import GoogleFit, { Scopes } from 'react-native-google-fit'
import { getWeekBoundary } from "./utils";

// variable
const window = Dimensions.get("window");
const { Colors,Strings } = ResHelper;

const pageSize = 10;
var pageNumber = 1;
class FitbandDataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fitStepList:[]
        }

    }

    componentDidMount() {
        this.fetchFitData()
    }
    
    fetchFitData = () =>{
        const options = {
            scopes: [
              Scopes.FITNESS_ACTIVITY_READ,
             // Scopes.FITNESS_ACTIVITY_WRITE,
             // Scopes.FITNESS_BODY_READ,
             // Scopes.FITNESS_BODY_WRITE,
            ],
          }
        GoogleFit.authorize(options).then(authResult =>{
        if(authResult.success){
            console.log('Auth_success')
            let boundary = getWeekBoundary(new Date().toISOString(),0)
            console.log('week boundary is', boundary);
            const opt = {
                startDate: boundary[0], // required ISO8601Timestamp
                endDate: boundary[1], // required ISO8601Timestamp
                bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
                bucketInterval: 1, // optional - default 1. 
            };
    
            GoogleFit.getDailyStepCountSamples(opt)
                .then((res) => {
                    console.log('Daily steps >>> ', JSON.stringify(res))
                    let listData = res? res[1]:{}
                    let list = listData ? listData.steps : []
                    this.setState({fitStepList:list})
                })
                .catch((err) => { console.warn(err) });

           
            // GoogleFit.getWeeklySteps(boundary[0],0)
            // .then((res) => {
            //     console.log('weekly steps >>> ', JSON.stringify(res))
            // })
            // .catch((err) => { console.warn(err) });

        }else{
            console.log('auth denied',authResult);
        }
        })
    }


   
    render() {
        console.log('fitband data is',this.state.fitStepList);
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <Header isnavLogo={true} title={Strings.titleFitListScreen} onPressRightIcon = {this.fetchFitData}/>
                <FlatList
                    keyExtractor={(item, index) => item.key}
                    data={this.state.fitStepList}
                    style={{ alignSelf: "center", marginTop: RFPercentage(3), marginBottom: RFPercentage(3) }}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item, index) => this.fitCardListItem(item, index)}
                    onEndReachedThreshold={0.2}
                    onEndReached={this.onEndReached}
               

                />


            </View>
        );
    }

    fitCardListItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => this.clickEventCard(item)}>
                <View style={{ marginTop: RFPercentage(2), height: window.height * 0.1, width: window.width * 0.9, borderRadius: RFPercentage(2.3), alignItems: 'center', backgroundColor: Colors.grey, }}>
                    <Text style={{ flex: 1, width: '90%', fontSize: RFPercentage(2.5),  textAlign: 'center', marginTop: RFPercentage(1) }}>{item.date}</Text>
                    <Text style={{ flex: 1, width: '90%', fontSize: RFPercentage(2), textAlign: 'center',marginBottom:RFPercentage(1) }}>{item.value}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    clickEventCard = (selectedItem) => {

    }

}


export default FitbandDataList