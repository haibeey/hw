var main,reMain,text;

/* A simple syntax highlightal which is totally customizable.
   you simply provide the id of the text content tag you want to highlight to
   the main function and call it.

  
  #parameters of the main function include
  #(1) idOfMain--> The id of the tag with text content you want to
  		highlight
  #(2) optional but recommnended height and width
  #(3) configuration-->  an array of words you want to highlight
		i.e in js js function,for,while.

  To style the keywords provided in the configuration
   .keywords{
		style goes here
   }
	for numbering
   .index{
	//
   }
   also to style the main
   #idOfMain{
	style here
   }

   you can also add other style in the css file

*/
function main(idOfMain,height,width,configuration){
	main=document.getElementById(idOfMain);
	text=main.textContent;
	main.textContent="";
	if(height){
		main.style.height=height+"px";
	}
	if(width){
		main.style.width=width+"px";
	}
	reMain=new RegExp(createConfiguration(configuration));
	fillParent(main,text,)
}

function createConfiguration(configuration){
	var res=configuration[0];
	configuration.forEach(function(word){
		res+="|"+word;
	})
	return res;
}

function fillParent(parent,text){
	var dDiv,indexDiv,newLineTokens,eachLine;
	//split the text by newline and performs styling on each
	newLineTokens=text.split("\n");
	for(var i=0;i<newLineTokens.length;i++){
		main.appendChild(fillParentHelper(newLineTokens[i],i+1));
	}
}

function createElement(name,id,Class){
	var element;
	element=document.createElement(name);
	if(id){
		element.id=id;
	}

	if(Class){
		element.className=Class;
	}
	return element;
}

function fillParentHelper(text,index){
	var i,last,re,flag,reAl,lineDiv,p;
	re =/\s/;
	reAl=/[a-z]/;
	flag=false;
	last=0;
	p=createElement("div","","ab");

	//numbers
	lineDiv=createElement("div",""+index,"index");
	lineDiv.appendChild(document.createTextNode(index));
	lineDiv.style.display="inline";
	p.appendChild(lineDiv)
	lineDiv=createElement("div","indexd","index");
	lineDiv.appendChild(document.createTextNode("|"));
	lineDiv.style.display="inline";
	p.appendChild(lineDiv)
	

	for(i =0;i<text.length;i++){

		if(re.test(text[i])){
			var partOfText=text.slice(last,i);
			var newText=createElement("div");
			newText.style.display="inline";
			if(reMain.test(partOfText)){
				
				newText.className="keywords";
				newText.appendChild(document.createTextNode(partOfText));
				p.appendChild(newText);
				flag=true;
			}
			else{
				newText.appendChild(document.createTextNode(partOfText));
				p.appendChild(newText);
			}
			last=i;
		}
		else if(flag && reAl.test(text[i])){
			//e.g ab  cd
			var partOfText=text.slice(last,i);
			var newText=createElement("div");
			newText.style.display="inline"
			newText.appendChild(document.createTextNode(partOfText));
			p.appendChild(newText);
			flag=false;
			last=i;
		}else if(i==text.length-1){
			var partOfText=text.slice(last,i+1);
			var newText=createElement("div","");
			newText.style.display="inline";
			if(reMain.test(partOfText)){
				//would style here
				newText.className="keywords";
				newText.appendChild(document.createTextNode(partOfText));
				p.appendChild(newText);
				flag=true;
			}
			else{
				newText.appendChild(document.createTextNode(partOfText));
				p.appendChild(newText);
			}
		}
	}
	return p;
}


//main("ab",500,500,["for","function"]);