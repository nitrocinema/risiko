use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize};
use std::fmt::Debug;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Team {
    pub army: u8,
    pub dead: bool
}

impl Team{
    pub(crate) fn new() -> Self{
        Self{
            army: 10,
            dead: false
        }
    }

    pub fn get_army(&self) -> u8{
        self.army
    }

    pub fn receive_hit(&mut self, hit: u8){
        self.army -= hit;
        if self.army <= 0 {
            self.dead = true;
            self.army = 0;
        }
    }

    pub fn set_dead(&mut self, dead :bool) {
        self.dead = dead;
    }
}