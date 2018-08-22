#! /bin/bash
echo -e "开始提交\n"
read -p "请填写内容的批注:" word
read -p "请填写所提交的分支(默认是master):" origin
git add -A
echo "git提交注释:[$word]" 
if 	[ !	-n "$word" ];then
   echo "请填写提交备注"
   exit 1;
else
	git commit -m $word
	if [ !	-n "$origin" ]; then
		git pull origin master
		git push origin master
	else
		git pull origin $origin
		git push origin $origin
	fi
	echo "完成";
fi
