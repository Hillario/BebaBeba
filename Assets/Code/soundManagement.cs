using UnityEngine;
using System.Collections;

public class soundManagement : MonoBehaviour {
    public AudioSource MusicA;
    public AudioSource MusicB;
    public AudioSource MusicC;
	// Use this for initialization
	void Start () {
        //randomize the music
        int randomInt;
        randomInt = Random.Range(1,4);
        if (randomInt == 1) 
        {
            MusicA.Play();
        }
        else if (randomInt == 2) 
        {
            MusicB.Play();
        }
        else if (randomInt == 3) 
        {
            MusicC.Play();
        }
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
