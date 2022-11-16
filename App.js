import React from 'react';
import { UnAuthorizedNavigation } from './screens/Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

//list of TODO:
// 1) types management
// 2) subTypes management
// 3) all the dropdowns are active
// +4) bottom menu
// 5) improve mark-up (think about some libraries)
// 6) account management page (to enter name, delete account, maybe colour, language etc)
// 7) dynamic background image based on settings
// 8) translation
// 9) currencies support. Whil we use firebase and don't have own back-end, we need to impelent logic like: every time when we save spend with curency different from default (zloty) we fetch exhange rates and recalculate the sum, and, we can put it locally (memmo) and to firebase for concrete date
// 10) 1 report (monthly by types)

export default function App() {
  return (
    <NavigationContainer>
      <UnAuthorizedNavigation />
    </NavigationContainer>
  );
}
