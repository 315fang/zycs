// script.js

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("personality_test.html")) {
        loadPersonalityTest();
    } else if (path.includes("interest_test.html")) {
        loadInterestTest();
    }
});

// 烟花特效函数
function createFireworks(x, y) {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "firework-particle";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 100;
        const ty = Math.sin(angle) * velocity * 100;
        
        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// 鲜花特效函数
function createFlower() {
    const flowers = ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹", "💐"];
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.top = "-50px";
    
    document.body.appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, 3000);
}

// 持续生成鲜花
function startFloatingFlowers() {
    setInterval(() => {
        if (Math.random() > 0.5) {
            createFlower();
        }
    }, 500);
}

// 光点汇聚绽放效果
function createParticleBurst(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "particle-burst";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.width = "8px";
        particle.style.height = "8px";
        particle.style.backgroundColor = "#28a745";
        particle.style.borderRadius = "50%";
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 3 + Math.random() * 4;
        const tx = Math.cos(angle) * velocity * 80;
        const ty = Math.sin(angle) * velocity * 80;
        
        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function loadPersonalityTest() {
    const questions = [
        // 外向性 (Extraversion) - E
        { question: "我是一个健谈且充满活力的人。", dimension: "E", score: 0 },
        { question: "我喜欢成为关注的焦点。", dimension: "E", score: 0 },
        { question: "我喜欢独处，享受安静的时光。", dimension: "E", score: 1 }, // 反向计分
        { question: "我容易在社交场合感到疲惫。", dimension: "E", score: 1 }, // 反向计分

        // 神经质 (Neuroticism) - N (情绪稳定性)
        { question: "我容易感到焦虑和担忧。", dimension: "N", score: 0 },
        { question: "我情绪波动较大，容易受外界影响。", dimension: "N", score: 0 },
        { question: "我通常能保持冷静，不易感到压力。", dimension: "N", score: 1 }, // 反向计分
        { question: "我很少感到沮丧或情绪低落。", dimension: "N", score: 1 }, // 反向计分

        // 宜人性 (Agreeableness) - A
        { question: "我富有同情心，乐于助人。", dimension: "A", score: 0 },
        { question: "我倾向于信任他人，并与人合作。", dimension: "A", score: 0 },
        { question: "我喜欢争论，不轻易妥协。", dimension: "A", score: 1 }, // 反向计分
        { question: "我对别人的感受不太敏感。", dimension: "A", score: 1 }, // 反向计分

        // 尽责性 (Conscientiousness) - C
        { question: "我做事有条理，计划性强。", dimension: "C", score: 0 },
        { question: "我认真负责，会尽力完成任务。", dimension: "C", score: 0 },
        { question: "我有时会粗心大意，缺乏纪律性。", dimension: "C", score: 1 }, // 反向计分
        { question: "我喜欢随性而为，不喜欢被计划束缚。", dimension: "C", score: 1 }, // 反向计分

        // 开放性 (Openness to Experience) - O
        { question: "我好奇心强，乐于接受新思想和新体验。", dimension: "O", score: 0 },
        { question: "我对艺术、哲学等抽象事物感兴趣。", dimension: "O", score: 0 },
        { question: "我墨守成规，不喜欢改变。", dimension: "O", score: 1 }, // 反向计分
        { question: "我更喜欢熟悉和传统的事物。", dimension: "O", score: 1 }  // 反向计分
    ];
    const testContainer = document.getElementById("test-container");
    const resultContainer = document.getElementById("result-container");
    const shareButton = document.getElementById("share-button");
    let currentQuestionIndex = 0;
    let answers = Array(questions.length).fill(0);

    function renderQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            testContainer.innerHTML = `
                <h2>${currentQuestionIndex + 1}. ${q.question}</h2>
                <div class="options">
                    <button data-value="1">非常不同意</button>
                    <button data-value="2">不同意</button>
                    <button data-value="3">中立</button>
                    <button data-value="4">同意</button>
                    <button data-value="5">非常同意</button>
                </div>
            `;
            testContainer.querySelectorAll(".options button").forEach(button => {
                button.onclick = (e) => {
                    answers[currentQuestionIndex] = parseInt(e.target.dataset.value);
                    currentQuestionIndex++;
                    renderQuestion();
                };
            });
        } else {
            calculatePersonalityResult();
        }
    }

    function calculatePersonalityResult() {
        const dimensions = { E: 0, N: 0, A: 0, C: 0, O: 0 };
        answers.forEach((answer, index) => {
            const q = questions[index];
            let score = answer;
            if (q.score === 1) { // 反向计分
                score = 6 - answer; // 1->5, 2->4, 3->3, 4->2, 5->1
            }
            dimensions[q.dimension] += score;
        });

        // 触发烟花和光点效果
        createFireworks(window.innerWidth / 2, window.innerHeight / 2);
        createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
        
        // 生成鲜花
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFlower();
            }, i * 100);
        }

        let resultText = "<h3>你的性格特质概览：</h3>";
        const dimensionNames = {
            E: "外向性 (Extraversion)",
            N: "神经质 (Neuroticism)",
            A: "宜人性 (Agreeableness)",
            C: "尽责性 (Conscientiousness)",
            O: "开放性 (Openness to Experience)"
        };

        const interpretations = {
            E: {
                high: "你是一个活泼开朗、善于社交的人，喜欢与人互动，精力充沛，在团队中往往是活跃气氛的领导者。适合需要大量人际交往和沟通的工作。",
                low: "你倾向于内向、独立，喜欢独处或小范围的社交活动，更专注于思考和深度工作。适合需要专注、独立思考的工作。"
            },
            N: {
                high: "你可能更容易感受到负面情绪，如焦虑、担忧、紧张，情绪波动较大。需要注意情绪管理和压力应对。",
                low: "你情绪稳定，冷静沉着，抗压能力强，不易受挫折影响，能够更好地应对工作中的挑战。"
            },
            A: {
                high: "你友善、合作、富有同情心，乐于助人，与人相处融洽，是优秀的团队合作者。适合需要良好人际关系和协作的工作。",
                low: "你可能更倾向于独立思考，有时会显得比较直接或固执，更注重个人目标和效率。"
            },
            C: {
                high: "你认真负责、有条理、自律性强，目标明确，追求卓越，是可靠的执行者。适合需要高度责任感和细致规划的工作。",
                low: "你可能比较随性，不喜欢被规则束缚，有时会显得不够严谨，但可能更具灵活性和创造力。"
            },
            O: {
                high: "你富有想象力、好奇心强、思想开放，乐于接受新事物和新观念，对艺术和文化有较高兴趣。适合需要创新思维和适应变化的工作。",
                low: "你更倾向于实际、传统，喜欢稳定和熟悉的环境，对新奇事物可能持保留态度，但通常更注重细节和执行。"
            }
        };

        for (const dim in dimensions) {
            const avgScore = dimensions[dim] / (questions.filter(q => q.dimension === dim).length);
            let level = "";
            let interpretation = "";
            if (avgScore >= 3.5) {
                level = "高";
                interpretation = interpretations[dim].high;
            } else if (avgScore <= 2.5) {
                level = "低";
                interpretation = interpretations[dim].low;
            } else {
                level = "中等";
                interpretation = "你在这方面表现均衡，既能适应相关特质要求，也能在需要时展现另一面。";
            }
            resultText += `<p><strong>${dimensionNames[dim]}：</strong> ${level} - ${interpretation}</p>`;
        }

        testContainer.style.display = "none";
        resultContainer.innerHTML = resultText;
        resultContainer.style.display = "block";
        shareButton.style.display = "block";
    }

    shareButton.onclick = () => {
        generateShareCard("大五人格测试结果", resultContainer.innerText);
    };

    renderQuestion();
}

function loadInterestTest() {
    const questions = [
        // 实际型 (Realistic) - R
        { question: "我喜欢操作工具、机器或进行户外活动。", type: "R" },
        { question: "我擅长机械维修、园艺或体育运动。", type: "R" },
        { question: "我喜欢解决实际问题，而不是抽象理论。", type: "R" },
        { question: "我更喜欢在户外工作，而不是在办公室。", type: "R" },

        // 研究型 (Investigative) - I
        { question: "我喜欢研究科学原理、解决复杂问题和进行实验。", type: "I" },
        { question: "我擅长分析数据、探究事物背后的原因和规律。", type: "I" },
        { question: "我喜欢独立思考和探索未知领域。", type: "I" },
        { question: "我喜欢阅读科学文献和学术著作。", type: "I" },

        // 艺术型 (Artistic) - A
        { question: "我喜欢通过艺术、音乐、写作或表演来表达自己。", type: "A" },
        { question: "我富有想象力、创造力，有独特的审美。", type: "A" },
        { question: "我喜欢自由地工作，不喜欢受太多限制。", type: "A" },
        { question: "我喜欢设计、绘画或创作。", type: "A" },

        // 社会型 (Social) - S
        { question: "我喜欢帮助他人、教导他人或提供咨询服务。", type: "S" },
        { question: "我善于与人沟通交流，关心别人的感受。", type: "S" },
        { question: "我喜欢团队合作，乐于分享。", type: "S" },
        { question: "我喜欢从事教育、咨询或社会服务类工作。", type: "S" },

        // 企业型 (Enterprising) - E
        { question: "我喜欢领导、影响他人，追求成就和财富。", type: "E" },
        { question: "我自信、有野心，喜欢挑战和竞争。", type: "E" },
        { question: "我擅长组织活动、管理团队和推销产品。", type: "E" },
        { question: "我喜欢创业或从事有影响力的工作。", type: "E" },

        // 常规型 (Conventional) - C
        { question: "我喜欢处理数据、文件，进行有组织、有规律的工作。", type: "C" },
        { question: "我注重细节、精确和效率，擅长整理归档。", type: "C" },
        { question: "我喜欢遵循明确的指示和程序。", type: "C" },
        { question: "我喜欢从事行政、财务或数据管理类工作。", type: "C" }
    ];
    const testContainer = document.getElementById("test-container");
    const resultContainer = document.getElementById("result-container");
    const shareButton = document.getElementById("share-button");
    let currentQuestionIndex = 0;
    let answers = Array(questions.length).fill(0);

    function renderQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            testContainer.innerHTML = `
                <h2>${currentQuestionIndex + 1}. ${q.question}</h2>
                <div class="options">
                    <button data-value="1">非常不喜欢</button>
                    <button data-value="2">不喜欢</button>
                    <button data-value="3">中立</button>
                    <button data-value="4">喜欢</button>
                    <button data-value="5">非常喜欢</button>
                </div>
            `;
            testContainer.querySelectorAll(".options button").forEach(button => {
                button.onclick = (e) => {
                    answers[currentQuestionIndex] = parseInt(e.target.dataset.value);
                    currentQuestionIndex++;
                    renderQuestion();
                };
            });
        } else {
            calculateInterestResult();
        }
    }

    function calculateInterestResult() {
        const types = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        answers.forEach((answer, index) => {
            const q = questions[index];
            types[q.type] += answer;
        });

        const sortedTypes = Object.entries(types).sort((a, b) => b[1] - a[1]);

        // 触发烟花和光点效果
        createFireworks(window.innerWidth / 2, window.innerHeight / 2);
        createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
        
        // 生成鲜花
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFlower();
            }, i * 100);
        }

        let resultText = "<h3>你的职业兴趣类型排序：</h3>";
        const typeNames = {
            R: "实际型 (Realistic)",
            I: "研究型 (Investigative)",
            A: "艺术型 (Artistic)",
            S: "社会型 (Social)",
            E: "企业型 (Enterprising)",
            C: "常规型 (Conventional)"
        };

        const typeDescriptions = {
            R: "你倾向于实际操作、动手能力强，喜欢与工具、机器打交道，或从事户外活动。你注重实际成果，解决具体问题。适合的职业包括：工程师、技工、建筑工人、农民、林业工作者、厨师、运动员等。",
            I: "你喜欢通过观察、分析、研究来探索事物的原理和规律。你好奇心强，善于独立思考，追求知识和真理。适合的职业包括：科学家、研究员、医生、程序员、数据分析师、大学教授等。",
            A: "你富有创造力、想象力，喜欢通过艺术、音乐、写作、表演等形式表达自己。你追求美感和独特性，不喜欢受太多限制。适合的职业包括：艺术家、设计师、作家、音乐家、演员、摄影师、广告创意人员等。",
            S: "你喜欢与人交往，乐于助人，善于沟通和理解他人。你注重人际关系，喜欢从事服务、教育或咨询类工作。适合的职业包括：教师、咨询师、社工、护士、心理学家、人力资源经理等。",
            E: "你自信、有野心，喜欢领导、影响他人，追求成就和财富。你具有冒险精神，善于组织和管理，喜欢竞争。适合的职业包括：企业家、销售经理、律师、政治家、市场总监、项目经理等。",
            C: "你喜欢有条理、有规则的工作，注重细节和精确。你擅长处理数据和文件，喜欢遵循明确的指示和程序。适合的职业包括：会计师、行政人员、银行职员、图书馆员、数据录入员、档案管理员等。"
        };

        sortedTypes.forEach(([type, score], index) => {
            resultText += `<p><strong>${index + 1}. ${typeNames[type]}：</strong> ${score} 分</p>`;
            resultText += `<p>${typeDescriptions[type]}</p>`;
        });
        resultText += `<p style="margin-top: 20px; font-size: 0.9em; color: #666;">你的前三种兴趣类型组合，通常代表了你最核心的职业倾向。</p>`;

        testContainer.style.display = "none";
        resultContainer.innerHTML = resultText;
        resultContainer.style.display = "block";
        shareButton.style.display = "block";
    }

    shareButton.onclick = () => {
        generateShareCard("霍兰德职业兴趣测试结果", resultContainer.innerText);
    };

    renderQuestion();
}

// 分享卡片生成功能 (使用html2canvas)
function generateShareCard(title, content) {
    // html2canvas库已在HTML文件中引入，无需再次引入
    const card = document.createElement("div");
    card.id = "share-card";
    card.style.width = "300px";
    card.style.padding = "20px";
    card.style.backgroundColor = "#e6ffe6"; // 浅绿色背景
    card.style.borderRadius = "10px";
    card.style.textAlign = "center";
    card.style.fontFamily = "Arial, sans-serif";
    card.style.position = "absolute";
    card.style.left = "-9999px"; // 隐藏在屏幕外
    card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    card.style.lineHeight = "1.6";
    card.style.color = "#333";

    // 格式化内容，将换行符替换为<br>，并处理粗体
    const formattedContent = content.split("\n").map(line => {
        if (line.startsWith("**") && line.endsWith("**")) {
            return `<p style="margin-top: 10px;">${line}</p>`;
        } else if (line.includes("：") && line.includes("分")) { // 兴趣测试分数行
            return `<p style="margin-bottom: 5px;">${line}</p>`;
        } else {
            return `<p style="margin-bottom: 5px;">${line}</p>`;
        }
    }).join("");

    card.innerHTML = `
        <h2 style="color: #28a745; margin-bottom: 15px;">${title}</h2>
        <div style="text-align: left; font-size: 0.9em;">${formattedContent}</div>
        <p style="margin-top: 20px; color: #666; font-size: 0.8em;">来自 职想 职业测评</p>
    `;
    document.body.appendChild(card);

    html2canvas(card, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "职业测评结果分享.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.body.removeChild(card);
        alert("分享卡片已生成并下载！");
    }).catch(error => {
        console.error("生成分享卡片失败:", error);
        alert("生成分享卡片失败，请稍后再试。");
        document.body.removeChild(card);
    });
}
