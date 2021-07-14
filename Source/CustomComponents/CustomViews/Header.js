import React from 'react'
import { View, Image, Dimensions, Text, TouchableOpacity, Platform } from "react-native";


// custom classes delcare 
import { ResHelper } from "../../Res/ResHelper";

// manager class
import { isIphoneX, RFPercentage } from '../../Utility/ScaleRatio';

// variable
const window = Dimensions.get("window");
const { Colors, Images } = ResHelper;


const Header = props => {
    const { leftView, title, onPressLeftIcon, onPressRightIcon, isnavLogo, subTitle } = props;
    return (
        <View style={{ height: (Platform.OS == 'ios') ? RFPercentage(12) : RFPercentage(8), backgroundColor: Colors.blue }}>
            <View style={{ width: window.width, height: RFPercentage(12), backgroundColor: Colors.transparents, flexDirection: 'column', marginTop: (isIphoneX() || Platform.OS == 'android') ? 20 : 10, }}>
                <View style={{ width: '70%', justifyContent: 'center', marginLeft: 50, marginRight: 70, flexDirection: 'row', position: 'absolute', marginTop: RFPercentage(1) }}>
                    {isnavLogo && <Image source={Images.icon_navLogo} style={{ width: RFPercentage(4), height: RFPercentage(4), marginBottom: RFPercentage(2.5) }} />}
                    <View style={{ flexDirection: 'column' }}>
                        <Text adjustsFontSizeToFit style={{ color: Colors.white, fontSize: subTitle ? RFPercentage(2.2) : RFPercentage(2.5), fontWeight: '600', paddingBottom: 3, textAlign: 'center', marginLeft: RFPercentage(1), marginTop: RFPercentage(0) }} numberOfLines={1} >{title ? title : ""}</Text>
                        {subTitle && <Text adjustsFontSizeToFit style={{ color: Colors.white, fontSize: Platform.OS == 'ios' ? RFPercentage(2.2) : RFPercentage(1.9), fontWeight: '300', paddingBottom: 0, textAlign: 'center', marginLeft: RFPercentage(1), marginTop: Platform.OS == 'ios' ? -2 : 0 }} numberOfLines={2} >{subTitle ? subTitle : ""}</Text>}
                    </View>
                </View>

                <View style={{ width: window.width, height: RFPercentage(8), flexDirection: 'row', position: 'absolute', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15, marginTop: (isIphoneX() || Platform.OS == 'android') ? 0 : 10, }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
                        {onPressRightIcon &&
                            <TouchableOpacity activeOpacity={0.8} onPress={onPressRightIcon} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                                <Image style={{ height: RFPercentage(3), width: RFPercentage(3), resizeMode: 'contain' }} source={Images.icon_refresh} />
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </View>
    );
}






export default Header;