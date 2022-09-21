use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen};
use near_sdk::serde::{Serialize};
use std::fmt::Debug;
use crate::response::Response;
use crate::team::Team;

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Risiko {
    pub blue: Team,
    pub red: Team,
    pub response: Response,
}

impl Default for Risiko {
    fn default() -> Self {
        Self {
            blue: Team::new(),
            red: Team::new(),
            response: Response::new()
        }
    }
}

#[near_bindgen]
impl Risiko {
    #[init]
    pub fn new() -> Self {
        Self {
            blue: Team::new(),
            red: Team::new(),
            response: Response::new()
        }
    }

    pub fn info(&self) -> &Risiko {
        self
    }

    pub fn battle(&mut self, blue_cubes: [u8; 3], red_cubes: [u8; 3]) -> &mut Risiko {
        if self.response.is_battle_end() {
            return self;
        }
        let hits: [u8; 2] = Risiko::calculate_hits(blue_cubes, red_cubes);
        self.blue.receive_hit(hits[0]);
        self.red.receive_hit(hits[1]);
        self.check_army();
        self
    }

    #[private]
    fn calculate_hits(mut blue_cubes: [u8; 3], mut red_cubes: [u8; 3]) -> [u8; 2] {
        let mut response:[u8; 2] = [0,0];
        blue_cubes.sort();
        red_cubes.sort();
        for x in 0..3 {
            if blue_cubes[x] == 0 || red_cubes[x] == 0 {
                continue;
            }

            if blue_cubes[x] <= red_cubes[x] {
                response[0] += 1;
            } else {
                response[1] += 1;
            }
        }

        response
    }

    pub fn reset(&mut self){
        self.blue = Team::new();
        self.red = Team::new();
        self.response = Response::new();
    }

    #[private]
    fn check_army(&mut self) {
        if self.response.is_battle_end() {
            return;
        }

        if self.blue.get_army() > 1 && self.red.get_army() > 0 {
            return;
        }

        if self.blue.get_army() < 2 && self.red.get_army() > 1 {
            if self.blue.get_army() < 1 {
                self.blue.set_dead(true);
            }
            self.response.battle_end("Red army is winner! Blue army doesn't have enough army for attack!".to_string());
        }

        if self.red.get_army() == 0 {
            self.red.set_dead(true);
            self.response.battle_end("Blue army is winner!".to_string());
        }
    }
}
