//Author: Shulin zhang
//Date:01/26/2024
//Description: Orpyx Coding Exercise 
//solution: 
//run instruction: node orpyx_mintriplefind.js
function moveEnd2Frontdigit()
{
	
	//based on 3 times between first digit and the last digit, 
        //below is possible combination of start and end digits
        //[S,E], S is the first digit, E is the last digit.
        const digitGrp=[[1,3],
                        [1,4],
                        [1,5],
                        [2,6],
                        [2,7],
                        [2,8],
                        [3,9]
                       ];
        //case 1:
	//orogin: 1ABCDEFGHIJ3
	//after : 31ABCDEFGHIJ
        //R         112 2         
        //orogin: 1034482GHIJ3
        //after : 31034482GHIJ
	//algrithom: use DP to calculate ABCDED.. to 3
        let minvalue=Infinity;
	for( const digits of digitGrp)
	{
	  const origin=[digits[0]];
          const afterR=[digits[1],digits[0]];
	  //calculate A
	  const Rfwd = afterR[0] - origin[0] *3;
          const minFound = inferNextDigit(1,origin,afterR,Rfwd);
          if(minFound)
          {
                const currMin = convert2num(origin);
		if(currMin < minvalue) minvalue = currMin;            
          }
	}
        return minvalue;
	
}

function convert2num(origin)
{
   const numstr = origin.join('');
   const number = BigInt(numstr);
   return number;
}

function inferNextDigit(inferPos,origin,afterR,rollForward)
{
 // case1: origin[inferPos-1] * 3 = afterR[inferPos]
 // case2: origin[inferPos-1] * 3 < afterR[inferPos], origin[inferPos] * 3 move tens... 
 const maxLength=40;
 if(origin.length >= maxLength)
      return false;
  //console.log(origin);
  //console.log(afterR);
  let vPos=0;
  
  const subtotal = rollForward * 10 + afterR[inferPos];
  vPos = Math.floor(subtotal / 3);
  vRollFwd = subtotal - vPos * 3; 

  origin.push(vPos);
  //check if match triple
  if(vPos === afterR[0] && vPos * 3 % 10 === afterR[inferPos]) 
   return true;
 // if(vPos === afterR[0] )
 // { 
 //  const originnum = convert2num(origin);
 //  const afterRnum = convert2num(afterR);
 //  console.log(originnum);
 //  console.log(afterRnum);
 //  if(originnum === afterRnum)  
 //    return true;
 // }	
  afterR.push(vPos);
  return inferNextDigit(inferPos + 1, origin, afterR,vRollFwd);  
}
const leastDigit = moveEnd2Frontdigit();

console.log('Min value:' + leastDigit);

