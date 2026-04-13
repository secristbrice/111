/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  question: string;
  answer: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  vocabulary: { word: string; explanation: string }[];
  coreIdea: string;
  questions: QuizQuestion[];
  reflection: string;
  magicTool: string;
  color: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "第 1 章：先学习 1 分钟！",
    subtitle: "打败‘不想学’的小怪兽",
    vocabulary: [
      { word: "半途而废", explanation: "做事情做到一半就不做了，比如拼图拼一半就去玩。" },
      { word: "干劲", explanation: "想要立刻去做一件事的心情，就像刚拿到新玩具时那种兴奋的感觉。" },
      { word: "小步子", explanation: "一次只走一小步，不着急。就像爬楼梯，一阶一阶慢慢上。" }
    ],
    coreIdea: "不要等“有心情”了再学习，而是先学一点点（比如 1 分钟），学着学着，干劲自己就来了！",
    questions: [
      { question: "老者说“先学习 1 分钟”，你觉得 1 分钟能做什么？", answer: "可以读一小段故事、写 3 个生字、背 1 个单词，或者做 1 道数学题。" },
      { question: "你有没有遇到过“不想写作业”的时候？你觉得“两分钟起跑法”能帮到你吗？", answer: "能！先告诉自己“只写 2 分钟”，写起来后可能就不想停了。" },
      { question: "为什么“先学习 1 分钟”比“我今天要学 2 小时”更容易坚持？", answer: "因为 1 分钟很短，不会觉得累，也没有压力。等学进去了，时间就会过得很快。" }
    ],
    reflection: "我以前总想着“等我心情好了再写作业”，结果拖到很晚。读了这一章，我决定试一下“只学 1 分钟”。我给自己设了 2 分钟计时器，开始背单词……结果背了 10 分钟！原来开始做，比想半天更有用。",
    magicTool: "一分钟魔法棒",
    color: "bg-amber-400"
  },
  {
    id: 2,
    title: "第 2 章：番茄工作法",
    subtitle: "学 25 分钟，休息 5 分钟",
    vocabulary: [
      { word: "集中注意力", explanation: "眼睛只看着书本，脑子里只想着学习，不想别的事。" },
      { word: "倒计时", explanation: "从 25 分钟开始，一分一秒减少，像沙漏一样。" },
      { word: "休息", explanation: "停下来放松一下，让大脑“充充电”。" }
    ],
    coreIdea: "学习像跑步一样，不能一直跑不停。学 25 分钟，休息 5 分钟，这样既能学进去，又不会太累。",
    questions: [
      { question: "为什么叫“番茄工作法”？", answer: "因为发明这个方法的人，用了一个番茄形状的厨房计时器。" },
      { question: "休息的 5 分钟可以做什么？不可以做什么？", answer: "可以喝水、上厕所、看看窗外。不可以看手机或平板，因为那样大脑没法真正休息。" },
      { question: "如果你在 25 分钟内想上厕所怎么办？", answer: "可以暂停计时，上完厕所再重新开始。要遵守“一个番茄时间不能被打断”的规则。" }
    ],
    reflection: "我以前写作业总是写一会儿就发呆。用了番茄工作法，我设了 25 分钟倒计时，像比赛一样。时间一到，我就去喝水、伸懒腰。这样我反而学得更快了，也不会觉得累。",
    magicTool: "番茄计时器",
    color: "bg-red-500"
  },
  {
    id: 3,
    title: "第 3 章：行动记录表",
    subtitle: "看看你的时间去哪了",
    vocabulary: [
      { word: "盲区", explanation: "自己看不到的地方。这里指“不知道自己把时间花在哪了”。" },
      { word: "可视化", explanation: "把看不见的东西变成能看见的，比如画成一张表。" },
      { word: "改善", explanation: "把不好的地方改好，比如把“发呆时间”改成“学习时间”。" }
    ],
    coreIdea: "把自己一天做了什么记下来，你就能发现：原来我浪费了好多时间！然后就可以把这些时间用来学习。",
    questions: [
      { question: "你觉得你每天花在“玩手机/看电视”上的时间大概有多少？", answer: "每个小朋友不一样，可能是 30 分钟，也可能是 2 小时。" },
      { question: "如果发现自己花在看电视上的时间太多了，可以怎么办？", answer: "可以规定自己只看 30 分钟，然后把省下来的时间用来读书或运动。" },
      { question: "为什么光靠脑子想“我今天做了什么”不准确？", answer: "因为人的记忆会骗人，写下来才是最真实的。" }
    ],
    reflection: "我记了一整天的时间表，发现我竟然花了 1 小时找橡皮和削铅笔！第二天我把文具提前准备好，果然省下了好多时间。记下来真的有用！",
    magicTool: "时间放大镜",
    color: "bg-blue-500"
  },
  {
    id: 4,
    title: "第 4 章：两分钟起跑法",
    subtitle: "拒绝拖延，立刻出发",
    vocabulary: [
      { word: "拖延症", explanation: "总是把今天该做的事拖到明天，比如作业拖到睡觉前才写。" },
      { word: "起跑", explanation: "跑步比赛开始的瞬间，这里指“开始行动”。" },
      { word: "计时器", explanation: "用来计时的工具，比如手机闹钟、厨房定时器。" }
    ],
    coreIdea: "不要想“我等下再做”，直接设 2 分钟计时器，立刻开始。2 分钟后你可以选择继续，也可以休息。但通常你都会想继续！",
    questions: [
      { question: "你觉得“拖延”是什么样子的？", answer: "比如妈妈叫你收拾书包，你说“再玩 5 分钟”，结果玩了半小时还没收。" },
      { question: "两分钟起跑法为什么有效？", answer: "因为 2 分钟很短，不吓人。一旦开始了，你就进入了“学习模式”，停不下来。" },
      { question: "2 分钟到了，你觉得是停下来还是继续？为什么？", answer: "继续！因为已经开始了，停下来反而觉得可惜。" }
    ],
    reflection: "我每次练琴都想拖。今天我用“两分钟起跑法”，对自己说“只弹 2 分钟”。结果弹完 2 分钟，我发现自己已经坐在琴凳上了，就又弹了 10 分钟。原来最难的是“开始”那一下。",
    magicTool: "起跑发令枪",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "第 5 章：学习日志",
    subtitle: "把进步画出来",
    vocabulary: [
      { word: "日志", explanation: "每天记录的本子，像航海日记一样。" },
      { word: "可视化", explanation: "把学习进度变成能看到的格子、颜色。" },
      { word: "成就感", explanation: "做完一件事后心里很满足、很开心。" }
    ],
    coreIdea: "每天记录自己学了什么、学了多久，然后给格子涂色。看到越来越多彩色格子，你就会很有成就感，想继续学下去！",
    questions: [
      { question: "你觉得“涂色打卡”有什么好处？", answer: "能清楚地看到自己的进步，不会觉得“白学了”。" },
      { question: "如果有一天没学习，格子空着，你会难过吗？怎么办？", answer: "会有一点难过，但没关系，第二天补上就行。不要因为一天没学就放弃。" },
      { question: "除了学习，还可以用什么来画“日志”？", answer: "练琴、跳绳、背古诗……任何想坚持的事都可以！" }
    ],
    reflection: "我做了一张“数学打卡表”，每天做完一页练习册就涂一个星星。一周下来，看到一整排星星，我好开心！原来我已经学了这么多！",
    magicTool: "彩色进度条",
    color: "bg-green-500"
  }
];
