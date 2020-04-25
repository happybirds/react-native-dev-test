(1) in file App.js (line 64 etc.), CSS code should have class concept. so separate the code into class

instead of  
style={{ flexGrow: 0, flexShrink: 0, height: 24, backgroundColor: '#a85'}}

the right way should be something like this:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
})

(2) each child in a list should have a unique 'key' prop

(3) IOS doesn't support TouchableNativeFeedback. 
the right way should be something like this:
import {Platform} from 'react-native';
if(Platform.OS === 'android'){... }

(4) enter from the list, Modal cannot be closed 

(5) App.js file is crowded. consider separation of concern 



