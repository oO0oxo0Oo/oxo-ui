<script setup lang="ts">
import { ref, h, reactive } from "vue";
import {
  OxMessage,
  OxNotification,
  OxMessageBox,
  type RenderLabelFunc,
  // type ButtonType,
} from "oxo-ui";

const openVal = ref(["a"]);
const loading = ref(false);
const dropdownOptions = ref([
  {
    label: "Option A",
    // name: 'a'
  },
  {
    label: "Option B",
    // name: 'b'
  },
  {
    label: "Option C",
    // name: 'c',
    divided: true,
  },
]);
const switchValue = ref(true);
const inputValue = ref("");
const selectValue = ref("");
const selectOptions = ref([
  {
    label: "Option A",
    value: "a",
  },
  {
    label: "Option B",
    value: "b",
  },
  {
    label: "Option C",
    value: "c",
    disabled: true,
  },
]);
const customOptionRender: RenderLabelFunc = (opt) => {
  return h("div", null, [
    h("b", { style: { color: "red" } }, opt.label),
    h("span", null, `~${opt.value}`),
  ]);
};

const formRef = ref();
const formData = reactive({
  email: "123",
  password: "",
  confirmPwd: "",
});
const formRules: any = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [
    { type: "string", required: true, trigger: "blur", min: 3, max: 5 },
  ],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (_: typeof formRules, value: string) =>
        value === formData.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};

function handleBtnClick() {
  OxMessage.info("Button Click");
}

function handleNotify() {
  OxNotification({
    title: "Title",
    message: "Message",
    type: "success",
  });
}

setInterval(() => {
  loading.value = !loading.value;
  // let loadingHandle = OxLoading.service();
  // if (loading.value) {
  //   loadingHandle = OxLoading.service();
  // } else {
  //   loadingHandle?.close();
  // }
}, 2000);

async function submit() {
  try {
    await formRef.value.validate();
    console.log("passed!");
  } catch (e) {
    console.log("the error", e);
  }
}

function callMessageBox() {
  OxMessageBox.confirm("确认删除吗？", "确认消息", {
    title: "标题",
    type: "warning",
    showClose: true,
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    callback: (action) => {
      console.log(action);
    },
    beforeClose(action, instance, next) {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "删除中...";
        setTimeout(() => {
          next();
        }, 2000);
      } else {
        next();
      }
    },
  });
}
</script>

<template>
  <div>
    <p>
      <ox-button @click="handleBtnClick" :use-throttle="false"
        >Default</ox-button
      >
      <ox-button type="primary" @click="handleNotify">Primary</ox-button>
      <ox-button type="success" @click="console.log('click')"
        >Success</ox-button
      >
      <ox-button type="info" @click="callMessageBox">Info</ox-button>
      <ox-button type="warning">Warning</ox-button>
      <ox-popconfirm title="Are you sure to delete this?">
        <ox-button type="danger">Danger</ox-button>
      </ox-popconfirm>
    </p>
    <p>
      <ox-button plain>Plain</ox-button>
      <ox-button type="primary" plain>Primary</ox-button>
      <ox-button type="success" plain>Success</ox-button>
      <ox-button type="info" plain>Info</ox-button>
      <ox-button type="warning" plain>Warning</ox-button>
      <ox-button type="danger" plain>Danger</ox-button>
    </p>
    <p>
      <ox-button round>Round</ox-button>
      <ox-button type="primary" round>Primary</ox-button>
      <ox-button type="success" round>Success</ox-button>
      <ox-button type="info" round>Info</ox-button>
      <ox-button type="warning" round loading>Warning</ox-button>
      <ox-button type="danger" round>Danger</ox-button>
    </p>
    <p>
      <ox-button icon="search" circle />
      <ox-button type="primary" icon="edit" circle />
      <ox-button type="success" icon="check" circle />
      <ox-button type="info" icon="message" circle />
      <ox-button type="warning" icon="star" circle />
      <ox-button type="danger" icon="trash" circle />
    </p>
    <p>
      <ox-button-group size="small" type="primary">
        <ox-button round>Round</ox-button>
        <ox-button type="primary" round>Primary</ox-button>
        <ox-button type="success" round>Success</ox-button>
        <ox-button type="info" round>Info</ox-button>
        <ox-button type="warning" round loading>Warning</ox-button>
        <ox-button type="danger" round>Danger</ox-button>
      </ox-button-group>
    </p>
    <ox-collapse v-model="openVal" accordion>
      <ox-collapse-item name="a" title="Title a">
        <h1>headline title</h1>
        <div>this is content a</div>
      </ox-collapse-item>
      <ox-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </ox-collapse-item>
      <ox-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </ox-collapse-item>
    </ox-collapse>
  </div>

  <ox-dropdown :items="dropdownOptions" size="small" split-button
    >dropdown</ox-dropdown
  >
  <ox-tooltip
    ref="tooltipRef"
    placement="right-end"
    trigger="contextmenu"
    :poppox-options="{ placement: 'right-end', strategy: 'fixed' }"
  >
    <ox-button icon="arrow-up">tooltip</ox-button>
    <template #content> 弹出部分 </template>
  </ox-tooltip>
  <ox-input v-model="inputValue" placeholder="请输入内容">
    <template #suffix> <button>test</button> </template>
    <template #append> test1</template>
  </ox-input>
  <ox-switch
    v-model="switchValue"
    size="large"
    active-text="ON"
    inactive-text="OFF"
  />
  <ox-select
    v-model="selectValue"
    placeholder="请选择"
    :rendox-label="customOptionRender"
    :options="selectOptions"
    clearable
    filterable
  >
    <ox-option label="opt 1" value="1" />
    <ox-option label="opt 2" value="2" />
    <span>a</span>
    <ox-option label="opt 3" value="3" disabled />
    <ox-option label="opt 4" value="4">
      <span style="color: green">opt 4</span>
    </ox-option>
  </ox-select>

  <ox-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-suffix=":"
    ox-loading-text="loading..."
    ox-loading-spinner="circle-notch"
    @submit="submit"
  >
    <ox-form-item label="email" prop="email" disabled>
      <ox-input v-model="formData.email" clearable />
    </ox-form-item>
    <ox-form-item label="password" prop="password">
      <ox-input v-model="formData.password" type="password" />
    </ox-form-item>
    <ox-form-item
      label="confirm password"
      prop="confirmPwd"
      :rules="[
        {
          required: true,
          trigger: 'test',
          message: '测试自定义触发',
        },
      ]"
    >
      <template #default="{ validate: _validate }">
        <ox-input v-model="formData.confirmPwd" type="password" />
        <button @click.prevent="_validate('test')">vli</button>
      </template>
    </ox-form-item>
    <div style="text-align: center">
      <ox-button type="primary" native-type="submit">Submit</ox-button>
    </div>
  </ox-form>

  <ox-alert title="title" type="success" show-icon />
  <ox-alert title="title" description="description" type="warning" show-icon />
  <ox-alert title="title" description="description" type="danger" show-icon />
  <ox-alert title="title" description="description" type="info" show-icon />

  <ox-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :default-file-list="[
      {
        uid: '123',
        size: 123,
        name: 'test.png',
        status: 'uploading',
        percent: 20,
      },
      {
        uid: '124',
        size: 123,
        name: 'test1.png',
        status: 'success',
        percent: 100,
      },
      {
        uid: '125',
        size: 123,
        name: 'test4.png',
        status: 'error',
        percent: 34,
      },
    ]"
  >
    <ox-button type="success" round icon="upload"> 上传文件 </ox-button>
  </ox-upload>
</template>