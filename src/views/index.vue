<script setup>
import BaseIndexHeader from "@/components/BaseIndexHeader.vue";
</script>

<template>
  <div class="header">
    <BaseIndexHeader class="headerIndex" />
  </div>
  <main>
    <div class="section section-1">
      <div class="left">
        <div class="text-box">
          <div>
            <h1>SMART LIST</h1>
            <p>
              A solução inteligente para você organizar sua rotina de forma
              prática e eficiente!!
            </p>
          </div>
          <router-link to="/login" class="button">
            <button>Já possui um cadastro? Faça login</button>
          </router-link>
        </div>
      </div>
      <div class="right">
        <img src="../assets/img/png/index1.png" alt="" />
      </div>
    </div>
    <div class="section section-2"></div>
  </main>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
}
.section-1 {
  align-items: center;
  justify-content: space-between;
  height: 800px;
  .left {
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding-bottom: 8rem;
    .text-box {
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;
      h1 {
        font-size: 70px;
        font-weight: 600;
        letter-spacing: 15px;
        color: #363636;
      }

      p {
        letter-spacing: 3px;
        color: #888888b7;
        font-weight: 500;
      }
    }

    .button {
      background-color: #407bff;
      color: #fff;
      padding: 12px;
      border-radius: 7px;
      box-shadow: 2px 5px 19px 10px #407cff57;
    }
  }

  .right {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
    }
  }

  @media (max-width: 816px) {
    flex-direction: column;
    height: auto;
    justify-content: center;
    align-items: center;

    .left,
    .right {
      width: 100%;
    }

    .right {
      margin-top: 55px;
      img {
        width: 60%;
      }
    }
    .left {
      padding-top: 3rem;
      align-items: center;
      justify-content: center;
      padding-bottom: 0;
      .text-box {
        width: 90%;
        align-items: center;
        justify-content: center;

        h1 {
          text-align: center;
        }

        p {
          text-align: center;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 650px) {
    .left {
      .text-box {
        h1 {
          font-size: 35px;
        }

        p {
          text-align: center;
          font-size: 12px;
        }

        .button {
          font-size: 12px;
        }
      }
    }

    .right {
      img {
        width: 70%;
      }
    }
  }

  @media (max-width: 400px) {
    .left {
      .text-box {
        h1 {
          font-size: 24px;
        }

        p {
          text-align: center;
          font-size: 12px;
        }

        .button {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
