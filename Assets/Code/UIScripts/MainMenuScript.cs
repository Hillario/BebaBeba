/*using UnityEngine;
using System.Collections;

public class MainMenuScript : MonoBehaviour {
	//controls the Input GUI of the mainMenu
	public GUITexture playGUI;
	public GUITexture optionsGUI;
	public GUITexture extrasGUI;
	public GUITexture quitGUI;
	public GUITexture brag;
	public GUITexture twitter;
	public float myscore;
	public float mycoins;
	public float mymoney;
	public GUIText coins;
	public GUIText score;
	public GUIText cash;
	public GUIText highscore;
	public GUIText totalcoins;
	public GUIText totalcash;
	public float achievedScore;
	public float sumcoins;
	public float  sumcash;
	public Light  gammaLight;
	public float gamma;
	public GUIText tip;
    public float difficulty;
	public float horizontalSpeed = 2.0F;
    private const string FACEBOOK_APP_ID = "349468091882096";
    private const string FACEBOOK_URL = "http://www.facebook.com/dialog/feed";

    void ShareToFacebook(string linkParameter, string nameParameter, string captionParameter, string descriptionParameter, string pictureParameter, string redirectParameter)
    {
        Application.OpenURL(FACEBOOK_URL + "?app_id=" + FACEBOOK_APP_ID +
        "&link=" + WWW.EscapeURL(linkParameter) +
        "&name=" + WWW.EscapeURL(nameParameter) +
        "&caption=" + WWW.EscapeURL(captionParameter) +
        "&description=" + WWW.EscapeURL(descriptionParameter) +
        "&picture=" + WWW.EscapeURL(pictureParameter) +
        "&redirect_uri=" + WWW.EscapeURL(redirectParameter));
    }
	// Use this for initialization
	void Start () {
		difficulty=50.0f;
		gamma=0.7f;
        difficulty = PlayerPrefs.GetFloat("difficulty");    
		gamma=PlayerPrefs.GetFloat("gamma");
		playGUI.color=Color.grey;
		optionsGUI.color=Color.grey;
		extrasGUI.color=Color.grey;
		quitGUI.color=Color.grey;
		brag.color=Color.grey;
		twitter.color=Color.grey;	
		//load the saved scores from the controlCar.js	
		myscore=PlayerPrefs.GetFloat("score");
		mycoins=PlayerPrefs.GetFloat("coins");
		mymoney=PlayerPrefs.GetFloat("money");	
		achievedScore=PlayerPrefs.GetFloat("achievedscore");	
		sumcoins=PlayerPrefs.GetFloat("sumcoins");
		sumcash=PlayerPrefs.GetFloat("sumcash");
		PlayerPrefs.SetFloat("allcoins",sumcoins);
		PlayerPrefs.SetFloat("allcash",sumcash);
		//randomize the tip information in the main menu 
		int randomInt;
		randomInt=Random.Range(1,11);
		switch(randomInt)
		{
		case 1:
			tip.text="Follow the road for more coins,points and money.";
			break;
		case 2:
			tip.text="More Coins and Money gives you bragging rights!";
			break;
		case 3:
			tip.text="If the game's too hard,change difficulty in options.";
			break;
		case 4:
			tip.text="You can see the specs of your device in extras.";
			break;
		case 5:
			tip.text="Go to extras to view the tutorial for playing BebaBeba.";
			break;
		case 6:
			tip.text="Free roam in the game instead of going on a mission.";
			break;
		case 7:
			tip.text="Complete the objective before time expires.";
			break;
		case 8:
			tip.text="Support us if you care...>>>>>>>>>>>>>>>>>";
			break;
		default:
			tip.text="The old warehouses is where the objective is located.";
			break;
		}
	
	}    
   
	// Update is called once per frame
	void Update () { 
		float h = horizontalSpeed * Input.GetAxis("Mouse X");
		transform.Rotate(0,h,0);
		if(Input.GetButtonDown("Jump"))
		{
			Application.LoadLevel(1);
		}	
		gammaLight.intensity=gamma;
        if (Input.GetKeyDown(KeyCode.F)) 
        {
            ShareToFacebook("https://www.facebook.com/codorpstudios", "Am playing BebaBeba",
            "New High Score! BEAT THAT!",
            "I got a Highscore of "+achievedScore+", "+
            sumcoins + " coins and a total amount of " +
            sumcash+" Kshs"+" using an "+
            "AI Difficulty of  Level "+difficulty+
            " while transporting goods to their destinations.Beat that!",
            "http://i.imgur.com/oDlszXS.png",
            " http://www.facebook.com/");
        }
        if (Input.GetKeyDown(KeyCode.T)) 
        {
            Application.OpenURL("https://www.twitter.com/codorpsgames/");
        }
	}
	void OnGUI()
	{
		//call the control GUI function
		ControlGUI();
		score.text="Score:"+myscore;
		coins.text="Coins:"+mycoins;
		cash.text="Cash:"+mymoney+"/=";	
		highscore.text="Highscore:"+achievedScore;
		totalcoins.text="TotalCoins:"+sumcoins;
		totalcash.text="Totalcash:"+sumcash+"/=";
		PlayerPrefs.SetFloat("highscore",achievedScore);
	}
    void LogCallback(FBResult response)
    {
        Debug.Log(response.Text);
    }

	void ControlGUI()
	{
		if(Input.touchCount>0)
		{
			if(playGUI.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					playGUI.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					playGUI.color=Color.grey;
					//open scene to play the game
					Application.LoadLevel(1);
				}
			}
			if(optionsGUI.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					optionsGUI.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					optionsGUI.color=Color.grey;
					//open the options scene
					Application.LoadLevel(3);
				}
			}
			if(extrasGUI.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					extrasGUI.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					extrasGUI.color=Color.grey;
					//open the extras scene
					Application.LoadLevel(4);
				}
			}
			if(quitGUI.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					quitGUI.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					quitGUI.color=Color.grey;
					//quit the game
					Application.Quit();
				}
			}
			if(brag.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					brag.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					brag.color=Color.grey;
					//post to facebook
                    ShareToFacebook("https://www.facebook.com/codorpstudios", "Am playing BebaBeba",
           "New High Score! BEAT THAT!",
           "I got a Highscore of " + achievedScore + ", " +
           sumcoins + " coins and a total amount of " +
           sumcash + " Kshs" + " using an " +
           "AI Difficulty of  Level " + difficulty +
           " while transporting goods to their destinations.Beat that!",
           "http://i.imgur.com/oDlszXS.png",
           " http://www.facebook.com/");                    
				}
			}
			if(twitter.HitTest(Input.GetTouch(0).position))
			{
				if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
				{
					//change color here	   
					twitter.color=Color.blue;
				}	  
				if(Input.GetTouch(0).phase==TouchPhase.Ended)
				{
					//change color here
					twitter.color=Color.grey;
					//like us on twitter
                    Application.OpenURL("https://www.twitter.com/codorpsgames/");
				}
			}
		}
	}
}
*/