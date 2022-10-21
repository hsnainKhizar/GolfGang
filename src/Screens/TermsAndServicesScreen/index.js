import { Text, View,SafeAreaView,Pressable, TextInput,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import React, { Component } from 'react'

export class TermsAndServicesScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ backgroundColor: '#2A7862' }}>

      </SafeAreaView>

      <View style={{ backgroundColor: '#2A7862', padding: 10, paddingBottom: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon onPress={() => { this.props.navigation.navigate.goBack() }} style={{ marginLeft: 10 }} color={"white"} onPress={() => { this.props.navigation.goBack() }} name="chevron-left" size={25} />
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 12, fontSize: 20, marginBottom: 10, alignSelf: 'flex-start', marginLeft: 16 }}>Terms of Services</Text>
      </View>

      {/* <Text style={{padding:10,marginLeft:16,fontSize:18}}> Terms of Services text shell go here.... </Text> */}
      <View style={{ flex: 1, marginTop: 10, marginRight: 14, marginBottom: 16 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ textAlign: 'justify', padding: 10, marginLeft: 16, fontSize: 14 }}>This Terms of services describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. </Text>
            <Text style={{ textAlign: 'justify', padding: 10, marginLeft: 16, fontSize: 14 }}>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Terms of services </Text>
            <Text style={{ textAlign: 'justify', padding: 10, marginLeft: 16, fontSize: 16, color: "#0394fc" }}>Interpretation</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural. </Text>
            <Text style={{ textAlign: 'justify', padding: 10, marginLeft: 16, fontSize: 14, color: "#0394fc" }}>Definitions</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>For the purposes of this Terms of services:</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 10, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Account</Text> means a unique account created for You to access our Service or parts of our Service.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Affiliate</Text> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Application</Text> means the software program provided by the Company downloaded by You on any electronic device, named golfgang</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Business</Text> for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers' personal information and determines the purposes and means of the processing of Consumers' personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers' personal information, that does business in the State of California.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Company</Text> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to golfgang.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Customer</Text>  for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Country</Text> refers to: Colorado, United States</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Device</Text> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Do Not Track</Text> (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Personal Data</Text> is any information that relates to an identified or identifiable individual.
              For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Sale</Text> for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer's personal information to another business or a third party for monetary or other valuable consideration.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Service</Text> refers to the application</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Service Provider</Text>  means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Usage Data</Text> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Text>
            <Text style={{ textAlign: 'justify', padding: 10, marginLeft: 16, fontSize: 14, color: "#0394fc" }}>Types of Data Collected</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Personal Data</Text> </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Service Provider</Text> While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

            </Text>

            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Email address</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  First name and last name</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Phone number</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Address, State, Province, ZIP/Postal code, City</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Usage Data</Text>

            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Usage Data</Text> </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Usage Data is collected automatically when using the Service.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}>Information Collected while Using the Application</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 16 }}>  Information regarding your location</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Pictures and other information from your</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, marginLeft: 16, fontSize: 14 }}>  Device's camera and photo library</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>You can enable or disable access to this information at any time, through Your Device settings.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#0394fc" }}>Use of Your Personal Data</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>The Company may use Personal Data for the following purposes:</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#000", fontWeight: '700' }}>To provide and maintain our Service,</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>including to monitor the usage of our Service.</Text>

            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#000", fontWeight: '700' }}>To manage Your Account: </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#000", fontWeight: '700' }}>For the performance of a contract: </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#000", fontWeight: '700' }}>To contact You:</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 16, color: "#000", fontWeight: '700' }}>To provide You</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>To manage Your requests:</Text> To attend and manage Your requests to Us.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>For business transfers:</Text> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>For other purposes:</Text>We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>We may share Your personal information in the following situations:</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>With Service Providers: </Text>We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>For business transfers:  </Text>We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>With Affiliates:  </Text>We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>With business partners: </Text>We may share Your information with Our business partners to offer You certain products, services or promotions.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>With other users: </Text>when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>With Your consent:  </Text>We may disclose Your personal information for any other purpose with Your consent.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Retention of Your Personal Data</Text> </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Transfer of Your Personal Data</Text> </Text>
            <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
              Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
              The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Disclosure of Your Personal Data</Text> </Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Business Transacions</Text> </Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Law enforcement</Text> </Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Other legal requirements</Text> </Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Comply with a legal obligation</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Protect and defend the rights or property of the Company</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Prevent or investigate possible wrongdoing in connection with the Service</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Protect the personal safety of Users of the Service or the public</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>Protect against legal liability</Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 13, color: "#0394fc" }}><Text style={{}}>Security of Your Personal Data</Text> </Text>
              <Text style={{ textAlign: 'justify', paddingLeft: 10, paddingTop: 8, marginLeft: 16, fontSize: 14 }}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</Text>
              
          </ScrollView>
        </View>

      
    </View>
    )
  }
}

export default TermsAndServicesScreen